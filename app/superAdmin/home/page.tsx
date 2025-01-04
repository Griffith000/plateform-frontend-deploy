'use client'
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2'
import { useAssignmentStore } from '@/app/store/MyStore/AssignmentsStore'
import Empty from '@/mic-component/lottie_animation/Empty'

import Layout from '@/mic-component/Admin_UI/Layout/Layout'

export type Assignment = {
  _id: string
  Title: string
  Description: string
  DueDate: string
  Attachments: string
}

export const assignments: Assignment[] = [
  {
    _id: '1',
    Title: 'Math Homework',
    Description: 'Complete exercises 1 to 10 from chapter 3.',
    DueDate: '2025-01-15',
    Attachments: 'math_homework.pdf'
  },
  {
    _id: '2',
    Title: 'Science Project',
    Description: 'Prepare a presentation on the solar system.',
    DueDate: '2025-01-20',
    Attachments: 'science_project.zip'
  },
  {
    _id: '3',
    Title: 'History Essay',
    Description: 'Write an essay on the Industrial Revolution.',
    DueDate: '2025-01-18',
    Attachments: 'history_essay.docx'
  },
  {
    _id: '4',
    Title: 'English Literature Analysis',
    Description: "Analyze the themes in 'To Kill a Mockingbird'.",
    DueDate: '2025-01-22',
    Attachments: 'literature_analysis.docx'
  },
  {
    _id: '5',
    Title: 'Physics Lab Report',
    Description: "Submit the lab report on Newton's Laws of Motion.",
    DueDate: '2025-01-25',
    Attachments: 'physics_lab_report.pdf'
  }
]

export default function Page() {
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
