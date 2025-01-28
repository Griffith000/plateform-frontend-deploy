'use client'
import React, { useEffect, useState } from 'react'
import { Button, Grid, Typography } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAssignmentStore } from '@/app/store/MyStore/AssignmentsStore'
import AssignmentCard from '@/mic-component/assignment_UI/AssignmentCard'
import PaginationComponent from '@/mic-component/PaginationComponent/PaginationComponent'
import Accordion from '@/mic-component/InstructorAccordion/Accordion'
import throttle from 'lodash.throttle'
import { useAuthStore } from '@/store/MyStore/AuthStore'
import useMediaQuery from '@mui/material/useMediaQuery'

export default function Page() {
  const assignments = useAssignmentStore(state => state.assignments)
  const fetchAssignments = useAssignmentStore(state => state.fetchAssignments)
  const searchParams = useSearchParams()
  const id_dep = searchParams.get('id_dep')

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const loadAssignments = throttle(async () => {
    await fetchAssignments(id_dep)
  }, 1000)

  useEffect(() => {
    loadAssignments()
  }, [])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentAssignments = assignments
    ? assignments.slice(indexOfFirstItem, indexOfLastItem)
    : []

  const handlePageChange = newPage => {
    setCurrentPage(newPage)
  }

  const isMobile = useMediaQuery('(max-width:600px)')

  return (
    <div className='container mx-auto mt-10 p-4'>
      <Grid container spacing={isMobile ? 2 : 4}>
        <Grid item xs={12} md={9}>
          {currentAssignments.length > 0 ? (
            currentAssignments.map(assignment => (
              <Grid item xs={12} key={assignment._id}>
                <AssignmentCard
                  assignment={{
                    _id: assignment._id,
                    Title: assignment.Title,
                    DueDate: assignment.DueDate,
                    description: assignment.Description,
                    Attachments: null
                  }}
                />
              </Grid>
            ))
          ) : (
            <div className='flex h-full flex-col items-center justify-center'>
              <Typography variant='h6' className='mt-4'>
                No Assignments Found
              </Typography>
            </div>
          )}
        </Grid>

        {/* Sidebar Accordion */}
        <Grid item xs={12} md={3}>
          <Accordion />
        </Grid>

        {/* Pagination */}
        <Grid item xs={12} className='mt-4 flex justify-center'>
          <PaginationComponent
            currentPage={currentPage}
            totalItems={assignments ? assignments.length : 0}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </Grid>
      </Grid>
    </div>
  )
}
