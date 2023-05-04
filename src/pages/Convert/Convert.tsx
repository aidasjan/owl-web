import React, { useState } from 'react'
import { Container, FileInput, Loader } from 'components'
import { useSearchParams } from 'react-router-dom'
import { useApi, useValidation } from 'hooks'
import { Box, Button, Heading, Select } from '@chakra-ui/react'

const Convert = () => {
  const [searchParams] = useSearchParams()
  const { convert } = useApi({ apiUrl: searchParams.get('api') })
  const { invalidFields, validate } = useValidation({
    requiredFields: ['file', 'format']
  })
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<{
    file: File | null
    format: string
  }>({
    file: null,
    format: 'rdf'
  })

  const handleSubmit = async () => {
    if (validate(formData) && formData.file) {
      setIsLoading(true)
      await convert(formData.file, formData.format)
      setIsLoading(false)
    }
  }

  const formats = [
    { label: 'RDF', value: 'rdf' },
    { label: 'OWL', value: 'owl' }
  ]

  return (
    <Container maxW="900px">
      <Heading>Convert</Heading>
      <Box mt={2}>Convert ontology to a different format</Box>
      <Box mt={12} mb={1}>
        File
      </Box>
      <FileInput
        selectedFile={formData.file}
        setSelectedFile={(file) => {
          setFormData({ ...formData, file })
        }}
        isInvalid={invalidFields.file}
      />
      <Box mt={6} mb={1}>
        Destination format
      </Box>
      <Select
        maxW="lg"
        onChange={(e) => {
          setFormData({ ...formData, format: e.target.value })
        }}
      >
        {formats.map((format) => (
          <option key={format.value} value={format.value}>
            {format.label}
          </option>
        ))}
      </Select>
      {isLoading && <Loader />}
      {!isLoading && (
        <Button colorScheme="green" onClick={handleSubmit} mt={6}>
          Convert
        </Button>
      )}
    </Container>
  )
}

export default Convert
