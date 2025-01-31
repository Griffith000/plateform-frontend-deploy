import { useEffect, useState } from 'react'
import axiosInstance from '@/axiosInstance*'
import { Controller } from 'react-hook-form'
import {
  MenuItem,
  FormControl,
  Select,
  CircularProgress,
  Typography
} from '@mui/material'
import { ENDPOINTS } from '@/store/constants/api'
import { useAuthStore } from '@/store/MyStore/AuthStore'

const InstructorSelect = ({ form, defaultInstructorName, setValue }) => {
  const [instructors, setInstructors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const user = useAuthStore(state => state.user)

  // Function to fetch instructors
  const fetchInstructors = async () => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.GET_INSTRUCTORS_NAMES,
        {
          DepartmentId: user.DepartmentId
        }
      )
      setInstructors(response.data.instructors)
      if (defaultInstructorName) {
        const matchingInstructor = response.data.instructors.find(
          instructor => instructor.NomPrenom == defaultInstructorName
        )
        if (matchingInstructor) {
          setValue('Instructor', defaultInstructorName)
        }
      }

      setLoading(false)
    } catch (error) {
      console.error('Error fetching instructors:', error)
      setError('Error fetching instructors')
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user?.DepartmentId) {
      fetchInstructors()
    }
  }, [])

  return (
    <Controller
      name='Instructor'
      control={form.control}
      render={({ field }) => (
        <FormControl fullWidth variant='outlined' margin='normal'>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color='error'>{error}</Typography>
          ) : (
            <Select
              {...field}
              onChange={e => field.onChange(e.target.value)}
              value={field.value || ''}
              displayEmpty
            >
              <MenuItem value='' disabled>
                Select an instructor
              </MenuItem>
              {/* Map through instructors and display each as a MenuItem */}
              {instructors.map(instructor => (
                <MenuItem key={instructor._id} value={instructor.NomPrenom}>
                  {instructor.NomPrenom}
                </MenuItem>
              ))}
            </Select>
          )}
        </FormControl>
      )}
    />
  )
}

export default InstructorSelect
