'use client'

import React, { useState } from 'react'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { useAssignmentStore } from '@/store/MyStore/AssignmentsStore'
import DeleteAssignmentModal from '@/mic-component/Instructor_UI/AssignmentDeleteModalForInstructor/AssignmentDeleteModalForInstructor'
import { useAuthStore } from '@/store/MyStore/AuthStore'

interface AssignmentCardProps {
  assignment: {
    _id: string
    Title: string
    DueDate: string
    Description: string
  }
}

export default function AssignmentCardForInstructor({
  assignment
}: AssignmentCardProps) {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const deleteAssignment = useAssignmentStore(state => state.deleteAssignment)
  const router = useRouter()

  const handleEdit = () => {
    router.push(`/instructor/create?assignmentId=${assignment._id}`)
  }
  const user = useAuthStore(state => state.user)

  const handleDelete = async () => {
    try {
      await deleteAssignment(assignment._id, user.DepartmentId)
      toast.success('Assignment deleted successfully')
      setDeleteModalOpen(false)
    } catch (error) {
      toast.error('Failed to delete assignment')
    }
  }

  return (
    <div className='mx-auto mb-4 mt-4 w-11/12 rounded-lg bg-white p-5 shadow-md'>
      {/* Header Section */}
      <div className='flex items-center justify-between'>
        <div>
          <h5 className='font-bold'>{assignment.Title}</h5>
          <p className='text-sm text-gray-500'>{assignment.DueDate}</p>
        </div>
        <div className='flex space-x-4'>
          <FiEdit
            className='cursor-pointer text-gray-500 hover:text-blue-500'
            onClick={handleEdit}
            size={20}
          />
          <FiTrash
            className='cursor-pointer text-gray-500 hover:text-red-500'
            onClick={() => setDeleteModalOpen(true)}
            size={20}
          />
        </div>
      </div>

      {/* Footer Section */}
      <div className='mt-4'>
        <Button
          onClick={() =>
            router.push(`/instructor/responses?assignmentId=${assignment._id}`)
          }
          className='rounded-md bg-gradient-to-r from-secondary to-primary text-white'
        >
          Responses
        </Button>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteAssignmentModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  )
}
