import React, { useState, useEffect } from 'react'
import { Response } from './../../../store/Models/Response'

import {
  Button,
  Typography,
  Grid,
  CardContent,
  Card,
  TextField,
  IconButton,
  Stack,
  useMediaQuery
} from '@mui/material'
import { useResponseStore } from '@/store/MyStore/ResponseStore'
import { useAuthStore } from '@/store/MyStore/AuthStore'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/react'
import { Send } from 'lucide-react'
import { toast } from 'react-hot-toast'

const ResponseSearch = ({ Assignment_Id, placeholder }) => {
  const {
    fetchResponseByAssignmentAndUser,
    updateResponseByMember,
    fetchedResponse,
    addResponse
  } = useResponseStore()
  const user = useAuthStore(state => state.user)
  const [userId, setUserId] = useState(user.id)
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState('')
  const fetchData = async () => {
    await fetchResponseByAssignmentAndUser(Assignment_Id, userId)
  }

  useEffect(() => {
    fetchData()
  }, [Assignment_Id, userId, fetchResponseByAssignmentAndUser])

  const handleEdit = () => {
    setIsEditing(true)
    setEditedContent(fetchedResponse.Content)
  }

  const handleSave = async () => {
    await updateResponseByMember({
      ...fetchedResponse,
      Content: editedContent,
      status: 'EDITED'
    })
    setIsEditing(false)
  }
  const responseSchema = z.object({
    responseContent: z
      .string()
      .url('Response content must be a valid URL')
      .nonempty('Response content cannot be empty')
  })
  const isMobile = useMediaQuery('(max-width:600px)')
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(responseSchema)
  })
  const onSubmit = async data => {
    if (data.responseContent) {
      try {
        await addResponse(data.responseContent, userId, Assignment_Id)
        toast.success('Response added successfully')
        fetchData() // Refresh data after adding response
      } catch (error) {
        toast.error('Failed to add response')
        console.error("Erreur lors de l'ajout de la réponse", error)
      }
    }
  }

  return (
    <div className='flex w-full flex-col items-center justify-center'>
      {fetchedResponse && !isMobile && (
        <Card
          className='w-full rounded-md bg-gray-100'
          elevation={0}
          style={{ width: '100%' }}
        >
          {/*  bg-gray-100 a mettre ou à supprimer */}
          <CardContent>
            <Grid container alignItems='center' justifyContent='space-between'>
              <Grid item xs={8}>
                <div className='flex-1 text-start' style={{ width: '100%' }}>
                  {!isEditing ? (
                    <>
                      <Typography
                        variant='h5'
                        className='text-start text-lg font-extrabold'
                      >
                        {fetchedResponse.Content}
                      </Typography>
                      <Typography
                        variant='subtitle2'
                        className='text-sm text-gray-500'
                      >
                        {new Date(fetchedResponse.createdAt).toLocaleString()}
                      </Typography>
                    </>
                  ) : (
                    <TextField
                      fullWidth
                      multiline
                      value={editedContent}
                      onChange={e => setEditedContent(e.target.value)}
                    />
                  )}
                </div>
              </Grid>

              <Grid item xs={4}>
                <Grid
                  container
                  direction='column'
                  spacing={1}
                  alignItems='flex-end'
                >
                  {/* Statut */}
                  <Grid item>
                    <Button
                      variant='outlined'
                      color={
                        fetchedResponse.status === 'APPROVED'
                          ? 'success'
                          : fetchedResponse.status === 'AWAITING FOR REVIEW'
                            ? 'error'
                            : 'warning'
                      }
                      style={{ minWidth: '150px' }}
                    >
                      {fetchedResponse.status}
                    </Button>
                  </Grid>

                  <Grid item>
                    <Stack direction='row' spacing={1}>
                      <IconButton onClick={handleEdit} aria-label='edit'>
                        <BorderColorIcon />
                      </IconButton>
                      {isEditing && (
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={handleSave}
                        >
                          Save
                        </Button>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
      {fetchedResponse && isMobile && (
        <Card
          className='rounded-md bg-gray-50 p-4 shadow-sm'
          elevation={0}
          style={{ width: '100%' }}
        >
          <CardContent>
            <Stack spacing={2}>
              {/* Contenu principal */}
              {!isEditing ? (
                <Stack spacing={1}>
                  <Typography
                    variant='h6'
                    className='overflow-hidden text-ellipsis whitespace-nowrap text-start font-bold'
                  >
                    {fetchedResponse.Content}
                  </Typography>
                  <Typography variant='body2' className='text-gray-500'>
                    {new Date(fetchedResponse.createdAt).toLocaleString()}
                  </Typography>
                </Stack>
              ) : (
                <TextField
                  fullWidth
                  multiline
                  value={editedContent}
                  onChange={e => setEditedContent(e.target.value)}
                  placeholder='Edit content...'
                />
              )}

              {/* Statut */}
              <Button
                variant='outlined'
                color={
                  fetchedResponse.status === 'APPROVED'
                    ? 'success'
                    : fetchedResponse.status === 'AWAITING FOR REVIEW'
                      ? 'error'
                      : 'warning'
                }
                style={{ width: '100%' }}
              >
                {fetchedResponse.status}
              </Button>

              {/* Actions */}
              <Stack direction='row' spacing={2} justifyContent='center'>
                {isEditing ? (
                  <>
                    {/* Bouton "Save" */}
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={handleSave}
                      style={{ flex: 1 }}
                    >
                      Save
                    </Button>
                    {/* Bouton "Cancel" */}
                    <Button
                      variant='outlined'
                      color='secondary'
                      onClick={() => {
                        setEditedContent(fetchedResponse.Content) // Réinitialise le contenu
                        setIsEditing(false) // Sort du mode édition
                      }}
                      style={{ flex: 1 }}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    variant='outlined'
                    startIcon={<BorderColorIcon />}
                    onClick={handleEdit}
                    style={{ flex: 1 }}
                  >
                    Edit
                  </Button>
                )}
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      )}

      {!fetchedResponse && (
        <Typography className='w-full text-red-600'>
          No response found for the given Assignment.
          <br />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex w-full items-center gap-3'
          >
            <Input
              placeholder={placeholder}
              className='mt-2 w-full rounded-lg border border-solid border-gray-400 md:w-full'
              fullWidth
              {...register('responseContent')}
            />
            <Button
              color='primary'
              className='mt-2 px-4 py-2 md:w-auto'
              type='submit'
            >
              <Send size={24} />
            </Button>
          </form>
          <div className='flex flex-col items-start'>
            {errors.responseContent && (
              <p className='pl-5 text-sm text-red-700'>
                {String(errors.responseContent.message)}
              </p>
            )}
          </div>
        </Typography>
      )}
    </div>
  )
}

export default ResponseSearch
