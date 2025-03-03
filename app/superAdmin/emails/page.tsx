'use client'

import Layout from '@/mic-component/Admin_UI/Layout/Layout'
import { useMutation } from '@tanstack/react-query'
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material'
import { useState } from 'react'
import axiosInstance from '@/axiosInstance*'
import { Visibility, VisibilityOff } from '@mui/icons-material'
export default function Page() {
  return (
    <Layout>
      <EmailForm />
    </Layout>
  )
}

const sendEmail = async emailData => {
  const response = await axiosInstance.post('super_admin/email', emailData)
  return response.data
}

const EmailForm = () => {
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    message: '',
    password: ''
  })

  const mutation = useMutation({
    mutationFn: sendEmail
  })

  const handleChange = e => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    mutation.mutate(emailData)
  }
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }
  return (
    <Container maxWidth='sm'>
      <Typography variant='h4' gutterBottom>
        Envoyer un Email d'inscription à la plateforme (email , password)
      </Typography>

      <TextField
        label='Email du destinataire'
        fullWidth
        margin='normal'
        name='to'
        value={emailData.to}
        onChange={handleChange}
      />

      <TextField
        label='Sujet'
        fullWidth
        margin='normal'
        name='subject'
        value={emailData.subject}
        onChange={handleChange}
      />

      <TextField
        label='Email'
        fullWidth
        margin='normal'
        name='message'
        value={emailData.message}
        onChange={handleChange}
      />

      <TextField
        label='Mot de passe'
        fullWidth
        margin='normal'
        name='password'
        type={showPassword ? 'text' : 'password'} // Alterne entre 'text' et 'password'
        value={emailData.password}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={togglePasswordVisibility} edge='end'>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      <Button
        variant='contained'
        color='primary'
        fullWidth
        onClick={handleSubmit}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? <CircularProgress size={24} /> : 'Envoyer'}
      </Button>

      {mutation.isSuccess && (
        <Typography variant='h6' color='success' style={{ marginTop: '10px' }}>
          {mutation.data.message}
        </Typography>
      )}

      {mutation.isError && (
        <Typography variant='h6' color='error' style={{ marginTop: '10px' }}>
          Échec de l'envoi de l'email
        </Typography>
      )}
    </Container>
  )
}
