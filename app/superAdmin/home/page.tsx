'use client'

import Layout from '@/mic-component/Admin_UI/Layout/Layout'
import React, { useEffect, useState } from 'react'

import { Box, Grid, Modal, Typography } from '@mui/material'

import { useAssignmentStore } from '@/store/MyStore/AssignmentsStore'
import { Assignment } from '@/store/Models/Assignment'
import AssignmentCard from '@/mic-component/assignment_UI/AssignmentCard'
import Empty from '@/mic-component/lottie_animation/Empty'

export default function Page() {
  const id_dep = '670792e3ee0e13424434d371'
  const fetchAssignments = useAssignmentStore(state => state.fetchAssignments)
  const assignments: Assignment[] = useAssignmentStore(
    state => state.assignments
  )

  useEffect(() => {
    const loadAssignments = async (departmentId: string) => {
      await fetchAssignments(departmentId)
    }
    if (id_dep) {
      loadAssignments(id_dep)
    }
  }, [])
  return (
    <Layout>
      <div style={{ marginTop: '20px', padding: '10px' }}>
        {assignments.length > 0 ? (
          assignments.map(assignment => (
            <>
              <div>{assignment.Title}</div>
            </>
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
    </Layout>
  )
}
