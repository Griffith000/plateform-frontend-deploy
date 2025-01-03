'use client'

import Layout from '@/mic-component/Admin_UI/Layout/Layout'
import React, { useEffect } from 'react'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { parse } from 'date-fns'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Box, Typography } from '@mui/material'
import { useSessionsStore } from '@/store/MyStore/SessionsStore'

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

const mockSessions: Session[] = [
  {
    _id: '1',
    Title: 'Introduction à la Programmation',
    Description:
      'Apprenez les bases de la programmation avec des exemples pratiques.',
    Instructor: 'Marie Dupont',
    InstructorId: 'string',
    Date: '01/01/2025 07:06:00',
    createdAt: 'string',
    Room: 'Salle A1'
  },
  {
    _id: '2',
    Title: 'JavaScript Avancé',
    Description:
      'Explorez les concepts avancés de JavaScript, comme les closures et les promesses.',
    Instructor: 'Jean Martin',
    InstructorId: 'string',
    Date: '02/01/2025 07:06:00',
    createdAt: 'string',
    Room: 'Salle B3'
  },
  {
    _id: '3',
    Title: 'Introduction au Machine Learning',
    Description:
      'Découvrez les principes fondamentaux du Machine Learning avec des exercices pratiques.',
    Instructor: 'Sophie Leclerc',
    InstructorId: 'string',
    Date: '03/01/2025 07:06:00',
    createdAt: 'string',
    Room: 'Salle C2'
  }
]

export default function Page() {
  const departmentId = '670792e3ee0e13424434d371'
  const fetchSessions = useSessionsStore(state => state.fetchSessions)
  const sessions: Session[] = useSessionsStore(state => state.sessions)
  useEffect(() => {
    const loadSessions = async (departmentId: string) => {
      await fetchSessions(departmentId)
    }
    if (departmentId) {
      loadSessions(departmentId)
    }
  }, [])

  // const sessions: Session[] = mockSessions
  const handleEventClick = (info: any) => {
    //setSelectedEvent(info.event.extendedProps)
  }

  return (
    <Layout>
      <div style={{ marginTop: '20px', padding: '10px' }}>
        {sessions.length > 0 ? (
          <>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin]}
              initialView='dayGridMonth'
              weekends={true}
              headerToolbar={{
                right: 'prev,next today',
                center: 'title',
                left: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              events={sessions.map(session => ({
                title: session.Title || 'Untitled Session',
                start: parse(session.Date, 'dd/MM/yyyy HH:mm:ss', new Date()),
                extendedProps: {
                  id: session._id,
                  title: session.Title || 'Untitled Session',
                  instructor: session.Instructor || 'Unknown Instructor',
                  room: session.Room || 'No Room Assigned',
                  description: session.Description || 'No description available'
                }
              }))}
              eventContent={eventInfo => renderEventContent(eventInfo)}
              eventClick={handleEventClick}
            />
          </>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p>No sessions available</p>
          </div>
        )}
      </div>
    </Layout>
  )
}
function renderEventContent(eventInfo: any) {
  const { event } = eventInfo
  const { title, start } = event
  const { instructor, room, description } = event.extendedProps
  return (
    <Box
      className='rounded-md bg-gradient-to-r from-secondary to-primary p-2 text-center text-white'
      sx={{
        width: '96%',
        overflow: 'auto',
        justifyContent: 'center',
        padding: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 2,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Typography variant='body2' fontWeight='bold'>
        {title}
      </Typography>
      <Typography variant='body2'>
        <strong>
          {new Date(start).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          })}
        </strong>
      </Typography>
      <Typography variant='body2'>
        <strong>Room:</strong> {room}
      </Typography>
    </Box>
  )
}
