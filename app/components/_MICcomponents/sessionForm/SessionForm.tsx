'use client'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/ui/form'
import { Input } from '@/ui/input'

import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format, parse } from 'date-fns'
import { Calendar } from '@/ui/calendar'
import { TimePicker } from '@/ui/time-picker/time-picker'

import { useSessionsStore } from '@/app/store/MyStore/SessionsStore'
import InstructorSelect from '../Instructor_UI/InstructorSelect/InstructorSelect'
import { useAuthStore } from '@/app/store/MyStore/AuthStore'
import { Session } from '@/store/Models/Session'
import { toast } from 'react-hot-toast'

const sessionSchema = z.object({
  Title: z.string().nonempty({ message: 'Title is required' }),
  Description: z.string().nonempty({ message: 'Description is required' }),
  Room: z.string().nonempty({ message: 'Room is required' }),
  Instructor: z.string().nonempty({ message: 'Instructor is required' }),
  Date: z.date()
})

export default function SessionForm({
  editingSession,
  setEditingSession,
  onClose
}) {
  const [loading, setLoading] = useState(false)

  const fetchSessions = useSessionsStore(state => state.fetchSessions)
  const updateSession = useSessionsStore(state => state.updateSession)
  const addSession = useSessionsStore(state => state.addSession)
  const user = useAuthStore(state => state.user)
  const sessionSchema = z.object({
    Title: z.string().nonempty({ message: 'Title is required' }),
    Description: z.string().nonempty({ message: 'Description is required' }),
    Room: z.string().nonempty({ message: 'Room is required' }),
    Instructor: z.string().nonempty({ message: 'Instructor is required' }),
    Date: z.date()
  })

  type FormSchemaType = z.infer<typeof sessionSchema>

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(sessionSchema)
  })
  useEffect(() => {
    if (editingSession) {
      console.log(editingSession)
      const formattedDate = parse(
        editingSession.Date,
        'dd/MM/yyyy HH:mm:ss',
        new Date()
      )
      console.log('Formatted Date:', formattedDate)
      console.log(typeof formattedDate)

      form.reset({
        Title: editingSession.Title,
        Description: editingSession.Description,
        Date: formattedDate,
        Room: editingSession.Room,
        Instructor: editingSession.Instructor
      })
    }
  }, [editingSession])

  async function onSubmit(values: FormSchemaType) {
    const formattedDate = format(values.Date, 'dd/MM/yyyy HH:mm:ss')

    try {
      setLoading(true)
      if (editingSession) {
        const editedData: Session = {
          _id: editingSession._id,
          InstructorId: values.Instructor,
          Title: values.Title,
          Description: values.Description,
          Room: values.Room,
          Date: formattedDate,
          Instructor: values.Instructor,
          createdAt: editingSession.createdAt
        }

        await updateSession(editingSession._id, editedData)

        console.log('updatedData : ')
        console.log(editedData)
        toast.success('Session updated successfully')
      } else {
        const updatedData: Session = {
          _id: null,
          createdAt: null,
          Instructor: values.Instructor,
          Title: values.Title,
          Description: values.Description,
          Room: values.Room,
          Date: formattedDate,
          InstructorId: values.Instructor
        }

        await addSession(updatedData, user.DepartmentId)

        toast.success('Session added successfully')
      }
      form.reset({
        Title: '',
        Description: '',
        Date: new Date(),
        Room: '',
        Instructor: ''
      })
      await fetchSessions(user.DepartmentId)

      setEditingSession(null)
    } catch (error) {
      toast.error("Erreur lors de l'opération", { position: 'top-center' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex h-full flex-col items-center justify-center rounded-b-md rounded-t-md border bg-slate-300 shadow-2xl'>
      <div className='w-full rounded-t-md bg-gradient-to-r from-secondary to-primary p-2 text-center text-white'>
        Create / Edit a session
      </div>

      <div className='w-full max-w-2xl rounded-lg bg-white px-3 pb-3 shadow-md'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-6 p-4'
          >
            <FormField
              control={form.control}
              name='Title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter title' {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.Title?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='Description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter description' {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.Description?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='Date'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DateTime</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {field.value ? (
                          format(field.value, 'PPP HH:mm:ss')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto bg-gray-100 p-0'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={date => date < new Date()}
                        initialFocus
                      />
                      <div className='border-border border-t p-3'>
                        <TimePicker
                          setDate={field.onChange}
                          date={field.value}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='Room'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter room' {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.Room?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='Instructor'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructor</FormLabel>
                  <FormControl>
                    <InstructorSelect
                      form={{
                        form
                      }}
                      defaultInstructorName={editingSession?.Instructor}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.Instructor?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <div>
              <Button
                type='submit'
                className='h-12 w-full rounded-md bg-gradient-to-r from-secondary to-primary text-white'
              >
                {loading ? 'Loading...' : 'Submit'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
