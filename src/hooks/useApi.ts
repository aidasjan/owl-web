import { useToast } from '@chakra-ui/react'
import { download } from 'utils/download'

const BASE_URL = process.env.REACT_APP_API_URL ?? 'http://localhost:8080'

interface Props {
  apiUrl?: string | null
}

export const useApi = ({ apiUrl }: Props) => {
  const toast = useToast()

  const sendRequest = async (
    path: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: any,
    isFormData?: boolean,
    downloadableProps?: { filename: string }
  ) => {
    let headers
    if (!isFormData) {
      headers = { 'Content-Type': 'application/json' }
    }
    const response = await fetch(`${apiUrl ?? BASE_URL}${path}`, {
      method,
      headers,
      body: isFormData ? body : JSON.stringify(body)
    })

    if (!response.ok) {
      if (response.status === 400) {
        const errorResult = await response.json().catch(() => null)
        if (errorResult) {
          toast({ status: 'error', title: errorResult.error })
        }
      } else if (response.status === 500) {
        toast({
          status: 'error',
          title: 'Something went wrong. Please try again later.'
        })
      }
      return null
    }

    if (downloadableProps) {
      const blob = await response.blob()
      const fileUrl = window.URL.createObjectURL(blob)
      download(fileUrl, downloadableProps.filename)
      return true
    }
    const result = await response.json()
    return result
  }

  const convert = async (file: File, format: string) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('format', format)
    return await sendRequest('/api/convert', 'POST', formData, true, {
      filename: `converted.${format}`
    })
  }

  return { convert }
}
