'use client'

import Layout from '@/mic-component/Admin_UI/Layout/Layout'
import React, { useEffect, useState } from 'react'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { parse } from 'date-fns'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Box, Grid, Modal, Typography } from '@mui/material'
import { useSessionsStore } from '@/store/MyStore/SessionsStore'
import { useSearchParams } from 'next/navigation'
import { useAssignmentStore } from '@/store/MyStore/AssignmentsStore'
import { Assignment } from '@/store/Models/Assignment'
import AssignmentCard from '@/mic-component/assignment_UI/AssignmentCard'
import Empty from '@/mic-component/lottie_animation/Empty'

export type Session = {
  _id: string
  Title: string
  Description: string
  Instructor: string
  InstructorId: string
  Date: string
  createdAt: string
  Room: string
}

export default function Page() {
  const id_dep = '670792e3ee0e13424434d371'
  const fetchAssignments = useAssignmentStore(state => state.fetchAssignments)
  const assignments: Assignment[] = useAssignmentStore(
    state => state.assignments
  )

  const loadAssignments = async () => {
    await fetchAssignments(id_dep)
  }
  useEffect(() => {
    loadAssignments()
  }, [])

  return (
    <Layout>
      <div style={{ marginTop: '20px', padding: '10px' }}>
        {assignments.length > 0 ? (
          assignments.map(assignment => (
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
              *
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
    </Layout>
  )
}
