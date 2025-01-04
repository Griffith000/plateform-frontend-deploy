'use client'

import React from 'react'
import Grid from '@mui/material/Grid2'
import { Typography } from '@mui/material'
import Layout from '@/mic-component/Admin_UI/Layout/Layout'

export type Assignment = {
  _id: string
  Title: string
  Description: string
  DueDate: string
}

export const assignments: Assignment[] = [
  {
    _id: '1',
    Title: 'Math Homework',
    Description: 'Complete exercises 1 to 10 from chapter 3.',
    DueDate: '2025-01-15'
  },
  {
    _id: '2',
    Title: 'Science Project',
    Description: 'Prepare a presentation on the solar system.',
    DueDate: '2025-01-20'
  },
  {
    _id: '3',
    Title: 'History Essay',
    Description: 'Write an essay on the Industrial Revolution.',
    DueDate: '2025-01-18'
  }
]

export default function Page() {
  return (
    <Layout>
      <div style={{ padding: '16px' }}>
        <Grid container spacing={2}>
          {assignments.map(assignment => (
            <Grid key={assignment._id}>
              <div
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '16px',
                  textAlign: 'center'
                }}
              >
                <Typography variant='h6'>{assignment.Title}</Typography>
                <Typography variant='body2' color='textSecondary'>
                  Due Date: {assignment.DueDate}
                </Typography>
                <Typography variant='body1'>
                  {assignment.Description}
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  )
}
