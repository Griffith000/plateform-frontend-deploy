'use client'

import React from 'react'
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px'
          }}
        >
          {assignments.map(assignment => (
            <div
              key={assignment._id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                backgroundColor: '#f9f9f9',
                textAlign: 'center'
              }}
            >
              <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
                {assignment.Title}
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#555' }}>
                Due Date: {assignment.DueDate}
              </p>
              <p style={{ fontSize: '1rem', marginTop: '8px' }}>
                {assignment.Description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
