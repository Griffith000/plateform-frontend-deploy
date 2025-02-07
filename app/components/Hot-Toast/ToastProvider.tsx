import { Toaster } from 'react-hot-toast'

export default function ToasterProvider() {
  return (
    <Toaster
      position='bottom-right'
      reverseOrder={false}
      toastOptions={{
        success: {
          style: {
            background: 'white',
            color: 'green'
          }
        },
        error: {
          style: {
            background: 'white',
            color: 'red'
          }
        }
      }}
    />
  )
}
