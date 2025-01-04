'use client'

import Layout from '@/mic-component/Admin_UI/Layout/Layout'
import React, { useEffect } from 'react'

import { useAssignmentStore } from '@/store/MyStore/AssignmentsStore'
import { Assignment } from '@/store/Models/Assignment'
import Empty from '@/mic-component/lottie_animation/Empty'
import AssignmentCard from '@/mic-component/assignment_UI/AssignmentCard'

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
            <div key={assignment._id}>
              <AssignmentCard
                assignment={{
                  _id: assignment._id,
                  Title: assignment.Title,
                  DueDate: assignment.DueDate,
                  description: assignment.Description,
                  Attachments: null
                }}
              />
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
