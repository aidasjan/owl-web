import React, { useState } from 'react'
import { Container, FileInput, Loader } from 'components'
import { useApi, useValidation } from 'hooks'
import { Box, Button, Heading, Select } from '@chakra-ui/react'

const FORMATS = [
  { label: 'RDF', value: 'rdfxml', extension: 'rdf' },
  { label: 'OWL', value: 'owlxml', extension: 'owx' },
  { label: 'Turtle', value: 'turtle', extension: 'ttl' },
  { label: 'Manchester', value: 'manchester', extension: 'omn' },
  { label: 'FSS', value: 'fss', extension: 'ofn' },
  { label: 'LaTeX', value: 'latex', extension: 'tex' }
]

const Convert = () => {
  const { convert } = useApi()
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
      try {
        await convert(
          formData.file,
          formData.format,
          FORMATS.find((format) => formData.format === format.value)
            ?.extension ?? ''
        )
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <Container maxW="900px">
      <Heading>Convert</Heading>
      <Box mt={2}>Convert ontology to a different format</Box>
      <Box mt={12} mb={1}>
        File
      </Box>
      <FileInput
        selectedFiles={formData.file ? [formData.file] : []}
        setSelectedFiles={(files) => {
          setFormData({ ...formData, file: files[0] })
        }}
        isSingle
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
        {FORMATS.map((format) => (
          <option key={format.value} value={format.value}>
            {format.label} (.{format.extension})
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
