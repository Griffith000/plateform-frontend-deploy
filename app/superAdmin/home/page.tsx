'use client'
import Layout from '@/mic-component/Admin_UI/Layout/Layout'
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  Grid,
  Box,
  Paper,
  Typography,
  Modal
} from '@mui/material'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useSearchParams } from 'next/navigation'
import Empty from '@/mic-component/lottie_animation/Empty'
import { useSessionsStore } from '@/store/MyStore/SessionsStore'
import { parse } from 'date-fns'
import timeGridPlugin from '@fullcalendar/timegrid'

type Session = {
  _id: string
  Title: string
  Date: string
  Instructor: string
  Room: string
  Description: string
}

export default function Page() {
  // const sessions = useSessionsStore(state => state.sessions)
  const sessions: Session[] = [
    {
      _id: '1',
      Title: 'Introduction à la Programmation',
      Description:
        'Apprenez les bases de la programmation avec des exemples pratiques.',
      Instructor: 'Marie Dupont',

      Date: '2025-01-15',

      Room: 'Salle A1'
    },
    {
      _id: '2',
      Title: 'JavaScript Avancé',
      Description:
        'Explorez les concepts avancés de JavaScript, comme les closures et les promesses.',
      Instructor: 'Jean Martin',

      Date: '2025-01-20',

      Room: 'Salle B3'
    },
    {
      _id: '3',
      Title: 'Introduction au Machine Learning',
      Description:
        'Découvrez les principes fondamentaux du Machine Learning avec des exercices pratiques.',
      Instructor: 'Sophie Leclerc',

      Date: '2025-01-25',

      Room: 'Salle C2'
    },
    {
      _id: '4',
      Title: 'Développement Web avec React',
      Description:
        'Apprenez à créer des applications web interactives avec React.',
      Instructor: 'David Moreau',

      Date: '2025-01-30',

      Room: 'Salle D1'
    },
    {
      _id: '5',
      Title: 'Gestion de Projet Agile',
      Description:
        'Introduction aux principes et outils de gestion de projet Agile.',
      Instructor: 'Emma Blanchard',

      Date: '2025-02-05',

      Room: 'Salle E4'
    }
  ]

  const fetchSessions = useSessionsStore(state => state.fetchSessions)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [selectedEvent, setSelectedEvent] = useState<any>(null) // Stocke les informations de l'événement sélectionné

  const searchParams = useSearchParams()
  // const departmentId = searchParams.get('id_dep')
  // const departmentId = '670792e3ee0e13424434d371'

  // useEffect(() => {
  //   const loadSessions = async (departmentId: string) => {
  //     await fetchSessions(departmentId)
  //   }
  //   if (departmentId) {
  //     loadSessions(departmentId)
  //   }
  // }, [])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentSessions = sessions
    ? sessions.slice(indexOfFirstItem, indexOfLastItem)
    : []

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleEventClick = (info: any) => {
    setSelectedEvent(info.event.extendedProps)
  }

  const handleCloseModal = () => {
    setSelectedEvent(null)
  }

  return (
    <Layout>
      <Paper
        sx={{
          height: '60%',
          marginTop: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 2,
          width: '70%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {currentSessions && currentSessions.length > 0 ? (
          <Grid container spacing={2}>
            {currentSessions.map(session => (
              <Grid item xs={12} sm={6} md={4} key={session._id}>
                <SessionCard session={session} />
              </Grid>
            ))}
          </Grid>
        ) : (
          // <Box
          //   sx={{
          //     padding: 1,
          //     backgroundColor: 'rgba(255, 255, 255, 0.8)',
          //     borderRadius: 2,
          //     width: '70%',
          //     height: '70%'
          //   }}
          // >
          //   <FullCalendar
          //     plugins={[dayGridPlugin, timeGridPlugin]}
          //     initialView='dayGridMonth'
          //     weekends={true}
          //     headerToolbar={{
          //       right: 'prev,next today',
          //       center: 'title',
          //       left: 'dayGridMonth,timeGridWeek,timeGridDay'
          //     }}
          //     events={currentSessions.map(session => ({
          //       title: session.Title || 'Untitled Session',
          //       start: parse(session.Date, 'dd/MM/yyyy HH:mm:ss', new Date()),
          //       extendedProps: {
          //         id: session._id,
          //         title: session.Title || 'Untitled Session',
          //         instructor: session.Instructor || 'Unknown Instructor',
          //         room: session.Room || 'No Room Assigned',
          //         description: session.Description || 'No description available'
          //       }
          //     }))}
          //     eventContent={eventInfo => renderEventContent(eventInfo)}
          //     eventClick={handleEventClick} // Gestionnaire pour le clic sur un événement
          //   />
          // </Box>
          <div>
            <Empty />
            <Typography variant='h5' className='text-center'>
              No sessions available
            </Typography>
          </div>
        )}

        {/* Modal pour afficher les détails de l'événement */}
        {/* <Modal
          open={!!selectedEvent}
          onClose={handleCloseModal}
          aria-labelledby='event-modal-title'
          aria-describedby='event-modal-description'
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',

              boxShadow: 24,

              borderRadius: 4
            }}
          >
            {selectedEvent && (
              <>
                <Typography
                  className='rounded-md bg-gradient-to-r from-secondary to-primary p-2 text-center text-white'
                  id='event-modal-title'
                  variant='h6'
                  component='h2'
                >
                  {selectedEvent.title || 'Untitled Session'}
                </Typography>
                <Typography
                  id='event-modal-description'
                  sx={{ pl: 4, pr: 4, mt: 2 }}
                >
                  <strong>Instructor:</strong> {selectedEvent.instructor}
                </Typography>
                <Typography sx={{ pl: 4, pr: 4 }}>
                  <strong>Room:</strong> {selectedEvent.room}
                </Typography>
                <Typography sx={{ pl: 4, pr: 4 }}>
                  <strong>Duration :</strong> 2 hours
                </Typography>
                <Typography sx={{ pl: 4, pr: 4, mb: 2 }}>
                  <strong>Description:</strong> {selectedEvent.description}
                </Typography>
              </>
            )}
          </Box>
        </Modal> */}
      </Paper>
    </Layout>
  )
}
const SessionCard: React.FC<{ session: Session }> = ({ session }) => (
  <Card variant='outlined' sx={{ marginBottom: 2 }}>
    <CardContent>
      <Typography variant='h6' gutterBottom>
        {session.Title}
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        {session.Description}
      </Typography>
      <Typography variant='body2' color='text.primary' sx={{ marginTop: 1 }}>
        <strong>Instructor:</strong> {session.Instructor}
      </Typography>
      <Typography variant='body2' color='text.primary'>
        <strong>Date:</strong> {session.Date}
      </Typography>
      <Typography variant='body2' color='text.primary'>
        <strong>Room:</strong> {session.Room}
      </Typography>
    </CardContent>
  </Card>
)

// function renderEventContent(eventInfo: any) {
//   const { event } = eventInfo
//   const { title, start } = event
//   const { instructor, room, description } = event.extendedProps
//   return (
//     <Box
//       className='rounded-md bg-gradient-to-r from-secondary to-primary p-2 text-center text-white'
//       sx={{
//         width: '96%',
//         overflow: 'auto',
//         justifyContent: 'center',
//         padding: 1,
//         backgroundColor: 'rgba(255, 255, 255, 0.9)',
//         borderRadius: 2,
//         boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
//       }}
//     >
//       <Typography variant='body2' fontWeight='bold'>
//         {title}
//       </Typography>
//       <Typography variant='body2'>
//         <strong>
//           {new Date(start).toLocaleTimeString('en-US', {
//             hour: '2-digit',
//             minute: '2-digit',
//             second: '2-digit',
//             hour12: false
//           })}
//         </strong>
//       </Typography>
//       <Typography variant='body2'>
//         <strong>Room:</strong> {room}
//       </Typography>
//     </Box>
//   )
// }
