'use client'
import React from 'react'

interface DeleteAssignmentModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const DeleteAssignmentModal: React.FC<DeleteAssignmentModalProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  if (!isOpen) return null

  return (
    <div
      id='popup-modal'
      tabIndex={-1}
      className='fixed left-0 right-0 top-0 z-50 flex h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-800 bg-opacity-50 md:inset-0'
    >
      <div className='relative max-h-full w-full max-w-md p-4'>
        <div className='relative rounded-lg bg-white shadow dark:bg-gray-700'>
          <button
            type='button'
            className='absolute right-2.5 top-3 h-8 w-8 rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900'
            onClick={onClose}
          >
            <svg
              className='h-3 w-3'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 14'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
              />
            </svg>
            <span className='sr-only'>Close modal</span>
          </button>
          <div className='p-4 text-center md:p-5'>
            <svg
              className='mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 20'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
              />
            </svg>
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete ?
            </h3>
            <button
              onClick={() => {
                onConfirm()
                onClose()
              }}
              type='button'
              className='duration-130 inline-flex items-center rounded-lg bg-MIC px-5 py-2.5 text-center text-sm font-medium text-white transition-colors delay-100 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300'
            >
              Yes, I am sure
            </button>
            <button
              onClick={onClose}
              type='button'
              className='ml-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400'
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteAssignmentModal
