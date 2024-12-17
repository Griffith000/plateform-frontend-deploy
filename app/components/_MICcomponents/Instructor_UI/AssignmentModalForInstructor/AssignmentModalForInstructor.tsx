import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@nextui-org/react'
import Image from 'next/image'
import { useResponseStore } from '@/app/store/MyStore/ResponseStore'
import { useAuthStore } from '@/app/store/MyStore/AuthStore'

export default function AssignmentModal({
  isOpen,
  onOpenChange,
  instructor,
  date,
  content,
  resources,
  imageUrl,
  assignmentId
}) {
  const { fetchResponses } = useResponseStore()
  const user = useAuthStore(state => state.user)
  const [User_Id] = useState(user.id)
  const [Assignment_Id] = useState(assignmentId)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchResponses(User_Id)
      } catch (error) {
        console.error('Erreur lors de la récupération des réponses', error)
      }
    }
    fetchData()
  }, [fetchResponses, User_Id])

  // Function to break content into lines
  const breakText = (text, maxLength = 80) => {
    const regex = new RegExp(`.{1,${maxLength}}`, 'g')
    return text.match(regex)
  }

  return (
    <Modal size={'3xl'} isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className='flex flex-col rounded-md bg-gradient-to-r from-secondary to-primary text-white'>
              Assignment Details
            </ModalHeader>
            <ModalBody className='flex w-full flex-col p-4'>
              <div className='flex w-full flex-col items-start justify-start space-y-4 md:space-x-4 md:space-y-0'>
                <div className='mb-4 flex w-full items-start justify-start gap-4 md:mb-0'>
                  <Image
                    src={'/images/Member/MemberBackground.png'}
                    alt='Person'
                    className='m-0 h-12 w-12 self-center rounded-full'
                    width={48}
                    height={48}
                  />
                  <div className='mb-2 flex-1 text-start'>
                    <h5 className='text-start text-lg font-extrabold'>
                      {instructor}
                    </h5>
                    <h6 className='text-sm text-gray-500'>{date}</h6>
                    <p className='mt-2 w-full text-sm text-gray-700 md:text-base'>
                      {breakText(content).map((line, idx) => (
                        <span key={idx}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className='flex justify-start'></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
