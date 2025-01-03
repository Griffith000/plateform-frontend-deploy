'use client'

import Layout from '@/mic-component/Admin_UI/Layout/Layout'
import React from 'react'

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
  }
]

export default function Page() {
  const sessions: Session[] = mockSessions

  return (
    <Layout>
      <div style={{ marginTop: '20px', padding: '10px' }}>
        {sessions.length > 0 ? (
          <div
            style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr' }}
          >
            {sessions.map(session => (
              <div
                key={session._id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '10px',
                  background: '#f9f9f9'
                }}
              >
                <h3 style={{ margin: '0 0 5px' }}>{session.Title}</h3>
                <p style={{ margin: '5px 0' }}>
                  <strong>Instructor:</strong> {session.Instructor}
                </p>
                <p style={{ margin: '5px 0' }}>
                  <strong>Date:</strong> {session.Date}
                </p>
                <p style={{ margin: '5px 0' }}>
                  <strong>Room:</strong> {session.Room}
                </p>
                <p style={{ margin: '5px 0' }}>{session.Description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p>No sessions available</p>
          </div>
        )}
      </div>
    </Layout>
  )
}
