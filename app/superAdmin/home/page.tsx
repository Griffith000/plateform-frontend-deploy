'use client'
import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { useAssignmentStore } from '@/app/store/MyStore/AssignmentsStore'
import Empty from '@/mic-component/lottie_animation/Empty'
import PaginationComponent from '@/mic-component/PaginationComponent/PaginationComponent'
import Accordion from '@/mic-component/InstructorAccordion/Accordion'
import throttle from 'lodash.throttle'
import Layout from '@/mic-component/Admin_UI/Layout/Layout'

export default function Page() {
  const assignments = useAssignmentStore(state => state.assignments)
  const fetchAssignments = useAssignmentStore(state => state.fetchAssignments)
  const searchParams = useSearchParams()
  const id_dep = searchParams.get('id_dep')

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const loadAssignments = throttle(async () => {
    if (id_dep) {
      await fetchAssignments(id_dep)
    }
  }, 1000)

  useEffect(() => {
    loadAssignments()
  }, [id_dep, fetchAssignments])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentAssignments =
    assignments?.slice(indexOfFirstItem, indexOfLastItem) || []

  const handlePageChange = newPage => setCurrentPage(newPage)

  return (
    <Layout>
      <div className='container mx-auto mt-32'>
        <div className='grid grid-cols-4 gap-4 px-10'>
          <div className='col-span-3'>
            {currentAssignments.length > 0 ? (
              currentAssignments.map((assignment, index) => (
                <Grid item xs={12} key={assignment._id || index}>
                  <div>
                    <p>{assignment.Title}</p>
                    <p>{assignment.DueDate}</p>
                    <p>{assignment.Description}</p>
                  </div>
                </Grid>
              ))
            ) : (
              <div className='flex h-full flex-col items-center justify-center'>
                <Empty />
                <h3 className='mb-4 mt-4 font-mono text-xl'>
                  No Assignments Found
                </h3>
              </div>
            )}
          </div>
          <div className='col-span-1'>
            <Accordion />
          </div>
          <div className='col-start-1 col-end-4 mb-5 mt-5 self-center justify-self-center'>
            <PaginationComponent
              currentPage={currentPage}
              totalItems={assignments?.length || 0}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}
