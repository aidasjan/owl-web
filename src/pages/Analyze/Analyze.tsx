import React, { useState } from 'react'
import { Container, FileInput, Loader } from 'components'
import { useApi, useValidation } from 'hooks'
import { Box, Button, Heading } from '@chakra-ui/react'

export interface Props {
  analysisType: 'individuals' | 'declarations'
}

const Analyze = ({ analysisType }: Props) => {
  const { getIndividuals, getDeclarations } = useApi()
  const { invalidFields, validate } = useValidation({
    requiredFields: ['file']
  })
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<{ file: File | null }>({
    file: null
  })

  const analysisTypes = {
    individuals: {
      apiFunction: getIndividuals,
      title: 'Individuals',
      description: 'Get individuals of an ontology'
    },
    declarations: {
      apiFunction: getDeclarations,
      title: 'Declarations',
      description: 'Get declarations of an ontology'
    }
  }

  const selectedAnalysis = analysisTypes[analysisType]

  const handleSubmit = async () => {
    if (validate(formData) && formData.file) {
      setIsLoading(true)
      try {
        await selectedAnalysis.apiFunction(formData.file)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <Container maxW="900px">
      <Heading>{selectedAnalysis.title}</Heading>
      <Box mt={2}>{selectedAnalysis.description}</Box>
      <Box mt={12} mb={1}>
        File
      </Box>
      <FileInput
        selectedFiles={formData.file ? [formData.file] : []}
        setSelectedFiles={(files) => {
          setFormData({ ...formData, file: files[0] })
        }}
        isInvalid={invalidFields.file}
      />
      {isLoading && <Loader />}
      {!isLoading && (
        <Button colorScheme="green" onClick={handleSubmit} mt={6}>
          Analyze
        </Button>
      )}
    </Container>
  )
}

export default Analyze
