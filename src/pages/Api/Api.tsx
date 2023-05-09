import React from 'react'
import { Container } from 'components'
import { Box, Flex, Heading } from '@chakra-ui/react'

const ENDPOINTS = [
  {
    path: '/api/v1/convert',
    method: 'POST',
    title: 'Convert',
    description: 'Converts ontology to a different format',
    type: 'form-data',
    parameters: [
      { key: 'file', type: 'File' },
      { key: 'format', type: 'String' }
    ]
  },
  {
    path: '/api/v1/merge',
    method: 'POST',
    title: 'Merge',
    description: 'Merges multiple ontologies into one file',
    type: 'form-data',
    parameters: [{ key: 'files', type: 'File[]' }]
  },
  {
    path: '/api/v1/individuals',
    method: 'POST',
    title: 'Individuals',
    description: 'Gets ontology individuals',
    type: 'form-data',
    parameters: [{ key: 'files', type: 'File' }]
  },
  {
    path: '/api/v1/declarations',
    method: 'POST',
    title: 'Declarations',
    description: 'Gets ontology declarations',
    type: 'form-data',
    parameters: [{ key: 'files', type: 'File' }]
  }
]

const Api = () => {
  return (
    <Container maxW="800px">
      <Heading>API</Heading>
      <Box mt={2}>
        The API is currently provided for free and does not require
        authentication. Please do not use it maliciously to keep it that way.
      </Box>
      <Box mt={12}>
        {ENDPOINTS.map((endpoint) => (
          <>
            <Heading size="md" mt={6}>
              {endpoint.title}
            </Heading>
            <Box borderRadius="xl" mt={2} backgroundColor="gray.100">
              <Flex>
                <Box
                  backgroundColor="green.500"
                  borderLeftRadius="xl"
                  textColor="white"
                  px={3}
                  py={2}
                >
                  {endpoint.method}
                </Box>
                <Box
                  backgroundColor="green.100"
                  borderRightRadius="xl"
                  w="full"
                  px={3}
                  py={2}
                >
                  {process.env.REACT_APP_API_URL}
                  {endpoint.path}
                </Box>
              </Flex>
              <Box p={3}>
                <Box>{endpoint.description}</Box>
                <Flex gap={2} mt={2} fontWeight="bold">
                  <Box>Type:</Box>
                  <Box textColor="gray.500">{endpoint.type}</Box>
                </Flex>
                <Flex gap={2} mt={2} fontWeight="bold">
                  <Box>Parameters:</Box>
                  <Box textColor="gray.500">
                    {endpoint.parameters.map((parameter) => (
                      <Box key={parameter.key}>
                        {parameter.key} : {parameter.type}
                      </Box>
                    ))}
                  </Box>
                </Flex>
              </Box>
            </Box>
          </>
        ))}
      </Box>
    </Container>
  )
}

export default Api
