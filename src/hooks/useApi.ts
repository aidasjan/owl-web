import { useToast } from '@chakra-ui/react'
import { download } from 'utils/download'

const BASE_URL = process.env.REACT_APP_API_URL ?? 'http://localhost:8080'

export const useApi = () => {
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
    const response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: isFormData ? body : JSON.stringify(body)
    }).catch(() => null)

    if (!response) {
      toast({
        status: 'error',
        title: 'Something went wrong'
      })
      return
    }

    if (!response.ok) {
      if (response.status === 400) {
        const errorResult = await response.json().catch(() => null)
        if (errorResult) {
          toast({
            status: 'error',
            title: errorResult.error ?? 'Invalid request'
          })
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

  const convert = async (file: File, format: string, extension: string) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('format', format)
    return await sendRequest('/api/v1/convert', 'POST', formData, true, {
      filename: `converted.${extension}`
    })
  }

  const merge = async (files: File[]) => {
    const formData = new FormData()
    files.reduce<FormData>((fd, file) => {
      fd.append('files', file)
      return fd
    }, formData)
    const extension = files[0].name.slice(files[0].name.lastIndexOf('.') + 1)
    return await sendRequest('/api/v1/merge', 'POST', formData, true, {
      filename: `merged.${extension}`
    })
  }

  const getDeclarations = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return await sendRequest('/api/v1/declarations', 'POST', formData, true, {
      filename: 'declarations.txt'
    })
  }

  const getIndividuals = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return await sendRequest('/api/v1/individuals', 'POST', formData, true, {
      filename: 'individuals.txt'
    })
  }

  return { convert, merge, getDeclarations, getIndividuals }
}
