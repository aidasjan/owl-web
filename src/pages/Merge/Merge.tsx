import React, { useState } from 'react'
import { Container, FileInput, Loader } from 'components'
import { useApi, useValidation } from 'hooks'
import { Box, Button, Heading } from '@chakra-ui/react'

const Merge = () => {
  const { merge } = useApi()
  const { invalidFields, validate } = useValidation({
    requiredFields: ['files']
  })
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<{ files: File[] }>({ files: [] })

  const handleSubmit = async () => {
    if (validate(formData) && formData.files) {
      setIsLoading(true)
      try {
        await merge(formData.files)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <Container maxW="900px">
      <Heading>Merge</Heading>
      <Box mt={2}>Merge multiple ontologies into a single file</Box>
      <Box mt={12} mb={1}>
        Files
      </Box>
      <FileInput
        selectedFiles={formData.files}
        setSelectedFiles={(files) => {
          setFormData({ ...formData, files })
        }}
        isInvalid={invalidFields.file}
      />
      {isLoading && <Loader />}
      {!isLoading && (
        <Button colorScheme="green" onClick={handleSubmit} mt={6}>
          Merge
        </Button>
      )}
    </Container>
  )
}

export default Merge
