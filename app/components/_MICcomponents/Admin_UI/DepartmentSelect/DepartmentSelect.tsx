import React, { useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import axios from '@/axiosInstance'
import { ENDPOINTS } from '@/store/constants/api'

const DepartmentSelect = ({ value = [], onChange }) => {
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(ENDPOINTS.GET_DEPARTMENTS_NAMES_IDS)
      setDepartments(response.data.departments)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching departments:', error)
      setError('Error fetching departments')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDepartments() // API call on component mount
  }, [])

  // Handle initial value based on edit or add
  const initialValues =
    value.length > 0
      ? value
          .map(departmentId =>
            departments.find(department => department._id === departmentId)
          )
          .filter(Boolean) // Filter out any undefined values
      : [] // Use empty array for new entries

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color='error'>{error}</Typography>
      ) : (
        <Autocomplete
          multiple
          options={departments}
          getOptionLabel={option => option.DepartmentName}
          onChange={(event, newValue) => {
            onChange(newValue.map(department => department._id))
          }}
          value={initialValues}
          renderInput={params => (
            <TextField
              {...params}
              variant='outlined'
              label='Select Departments'
              placeholder='Departments'
            />
          )}
          isOptionEqualToValue={(option, value) => option._id === value._id} // For multiple selections
        />
      )}
    </div>
  )
}

export default DepartmentSelect
