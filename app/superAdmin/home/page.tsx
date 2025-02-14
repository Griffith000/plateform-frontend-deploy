'use client'

import axiosInstance from '@/axiosInstance*'
import Layout from '@/mic-component/Admin_UI/Layout/Layout'
import {
  useQuery,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

export default function Page() {
  return (
    <Layout>
      <AdminHome />
    </Layout>
  )
}

function AdminHome() {
  const query = useQuery({
    queryKey: ['stat'],
    queryFn: async () => {
      const { data } = await axiosInstance
        .get('/member/count')
        .then(res => res.data)
      return data
    }
  })

  return (
    <div>
      <p>Admin Home Pas encore implémenté</p>
      <p>All Members : {JSON.stringify(query.data)}</p>
    </div>
  )
}
