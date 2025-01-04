'use client'
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2'
import { useAssignmentStore } from '@/app/store/MyStore/AssignmentsStore'
import Empty from '@/mic-component/lottie_animation/Empty'

import Layout from '@/mic-component/Admin_UI/Layout/Layout'

export default function Page() {
  const assignments = useAssignmentStore(state => state.assignments)
  const fetchAssignments = useAssignmentStore(state => state.fetchAssignments)

  const id_dep = '670792e3ee0e13424434d371'

  const loadAssignments = async () => {
    if (id_dep) {
      await fetchAssignments(id_dep)
    }
  }

  useEffect(() => {
    loadAssignments()
  }, [])

  return (
    <Layout>
      <div>
        {assignments.length > 0 ? (
          assignments.map((assignment, index) => (
            <Grid key={assignment._id || index}>
              <div>
                <p>{assignment.Title}</p>
                <p>{assignment.DueDate}</p>
                <p>{assignment.Description}</p>
              </div>
            </Grid>
          ))
        ) : (
          <div>
            <Empty />
            <h3>No Assignments Found</h3>
          </div>
        )}
      </div>
    </Layout>
  )
}
