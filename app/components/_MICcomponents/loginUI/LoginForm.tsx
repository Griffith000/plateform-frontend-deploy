'use client'
import React, { useState } from 'react'
import { TypewriterEffectSmoothDemo } from '@/mic-component/typewriterEffect/TypewriterEffectSmoothDemo'
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
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/MyStore/AuthStore'
import { Eye, EyeOff } from 'lucide-react'
export default function LoginForm() {
  const login = useAuthStore(state => state.login)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const formSchema = z.object({
    email: z
      .string()
      .email({ message: 'Invalid email address' })
      .min(10, { message: 'Your email must meet the email format' })
      .max(30),
    password: z
      .string()
      .min(6, {
        message: 'Invalid password'
      })
      .max(30)
    //rememberMe: z.boolean().optional()
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
      //rememberMe: false
    }
  })

  const user = useAuthStore(state => state.user)

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      await login(data.email, data.password)
      const updatedUser = useAuthStore.getState().user

      if (!updatedUser) {
        throw new Error('User data not found after login')
      }
      // console.log('updatedUser', updatedUser)
      if (updatedUser.role === 'member') {
        router.push('/member')
      } else if (updatedUser.role === 'instructor') {
        router.push('/instructor/assignments')
      } else {
        router.push('/superAdmin/home')
      }
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='mx-5 flex h-full flex-col items-center justify-center rounded-xl border bg-slate-50 shadow-2xl'>
      {' '}
      <div className='w-full max-w-md rounded-lg bg-white p-7 shadow-xl'>
        <div className='mb-6 w-full text-center'>
          <TypewriterEffectSmoothDemo />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='mb-5'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your email' {...field} />
                  </FormControl>
                  <FormMessage className='text-red-800' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => {
                return (
                  <FormItem className='relative mb-6'>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Enter your password'
                          {...field}
                        />
                        <button
                          type='button'
                          className='absolute inset-y-0 right-0 flex items-center pr-3'
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className='h-5 w-5 text-gray-500' />
                          ) : (
                            <Eye className='h-5 w-5 text-gray-500' />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className='text-red-800' />
                  </FormItem>
                )
              }}
            />
            {/* <FormField
              control={form.control}
              name='rememberMe'
              render={({ field }) => (
                <FormItem className='mb-6'>
                  <FormControl>
                    <Checkbox  />
                    <FormLabel>Remember Me</FormLabel>
                  </FormControl>
                </FormItem>
              )}
            /> */}
            <Button
              type='submit'
              className='h-12 w-full rounded-md bg-gradient-to-r from-secondary to-primary text-white'
            >
              {loading ? (
                <span className='loading loading-spinner loading-md'></span>
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
