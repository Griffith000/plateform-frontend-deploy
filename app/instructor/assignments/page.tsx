'use client'

import React, { useEffect, useState } from 'react'
import { Button, Grid, Typography } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { useAssignmentStore } from '@/app/store/MyStore/AssignmentsStore'
import AssignmentCard from '@/mic-component/assignment_UI/AssignmentCard'
import PaginationComponent from '@/mic-component/PaginationComponent/PaginationComponent'
import Accordion from '@/mic-component/InstructorAccordion/Accordion'
import throttle from 'lodash.throttle'
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

  // Calculer les assignments à afficher pour la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentAssignments = assignments
    ? assignments.slice(indexOfFirstItem, indexOfLastItem)
    : []

  const handlePageChange = newPage => {
    setCurrentPage(newPage)
  }

  const isMobile = useMediaQuery('(max-width:600px)') // Détecter un écran mobile

  return (
    <div className='container mx-auto mt-32'>
      <div
        className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-4'} gap-4 px-10`}
      >
        <div className={`${isMobile ? 'col-span-1' : 'col-span-3'}`}>
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
              <h3 className='mb-4 mt-4 font-mono text-xl'>
                No Assignments Found
              </h3>
            </div>
          )}
        </div>

        {!isMobile && (
          <div className='col-span-1'>
            <Accordion />
          </div>
        )}

        <div
          className={`${
            isMobile ? 'col-span-1' : 'col-start-1 col-end-4'
          } mb-5 mt-5 self-center justify-self-center`}
        >
          <PaginationComponent
            currentPage={currentPage}
            totalItems={assignments ? assignments.length : 0}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}
