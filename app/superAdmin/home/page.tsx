'use client'

import Layout from '@/mic-component/Admin_UI/Layout/Layout'
import React, { useEffect } from 'react'

import { useAssignmentStore } from '@/store/MyStore/AssignmentsStore'
import { Assignment } from '@/store/Models/Assignment'
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

  // const assignments: Assignment[] = [
  //   {
  //     _id: '1',
  //     Title: 'Math Homework',
  //     Description: 'Complete exercises 1 to 10 from chapter 3.',
  //     DueDate: '2025-01-15',
  //     Attachments: 'math_homework.pdf'
  //   },
  //   {
  //     _id: '2',
  //     Title: 'Science Project',
  //     Description: 'Prepare a presentation on the solar system.',
  //     DueDate: '2025-01-20',
  //     Attachments: 'science_project.zip'
  //   },
  //   {
  //     _id: '3',
  //     Title: 'History Essay',
  //     Description: 'Write an essay on the Industrial Revolution.',
  //     DueDate: '2025-01-18',
  //     Attachments: 'history_essay.docx'
  //   },
  //   {
  //     _id: '4',
  //     Title: 'English Literature Analysis',
  //     Description: "Analyze the themes in 'To Kill a Mockingbird'.",
  //     DueDate: '2025-01-22',
  //     Attachments: 'literature_analysis.docx'
  //   },
  //   {
  //     _id: '5',
  //     Title: 'Physics Lab Report',
  //     Description: "Submit the lab report on Newton's Laws of Motion.",
  //     DueDate: '2025-01-25',
  //     Attachments: 'physics_lab_report.pdf'
  //   }
  // ]

  return (
    <Layout>
      <div style={{ marginTop: '20px', padding: '10px' }}>
        {assignments.length > 0 ? (
          assignments.map(assignment => (
            <div key={assignment._id}>
              <div>{assignment.Title}</div>
            </div>
          ))
        ) : (
          <div>
            <h3>No Assignments Found</h3>
          </div>
        )}
      </div>
    </Layout>
  )
}
