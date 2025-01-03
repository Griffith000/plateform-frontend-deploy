'use client'

import Layout from '@/mic-component/Admin_UI/Layout/Layout'
import React, { useState } from 'react'
import { Card, CardContent, Grid, Paper, Typography } from '@mui/material'
import Empty from '@/mic-component/lottie_animation/Empty'

type Session = {
  _id: string
  Title: string
  Date: string
  Instructor: string
  Room: string
  Description: string
}

const mockSessions: Session[] = [
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

export default function Page() {
  const sessions: Session[] = mockSessions

  return (
    <Layout>
      <Paper
        sx={{
          height: 'auto',
          marginTop: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 2,
          padding: 2,
          width: '70%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {sessions.length > 0 ? (
          <Grid container spacing={2}>
            {sessions.map(session => (
              <Grid item xs={12} sm={6} md={4} key={session._id}>
                {/* <SessionCard session={session} /> */}
                <div> session </div>
              </Grid>
            ))}
          </Grid>
        ) : (
          <EmptyState />
        )}
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
      <Typography variant='body2' sx={{ marginTop: 1 }}>
        <strong>Instructor:</strong> {session.Instructor}
      </Typography>
      <Typography variant='body2'>
        <strong>Date:</strong> {session.Date}
      </Typography>
      <Typography variant='body2'>
        <strong>Room:</strong> {session.Room}
      </Typography>
    </CardContent>
  </Card>
)

const EmptyState = () => (
  <div style={{ textAlign: 'center' }}>
    <Empty />
    <Typography variant='h5'>No sessions available</Typography>
  </div>
)
