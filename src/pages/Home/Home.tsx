import React from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { Container } from 'components'

const Home = () => {
  return (
    <Container maxW="800px">
      <Flex
        direction="column"
        align="center"
        justify="center"
        textAlign="center"
        my={20}
      >
        <Heading
          as="h1"
          size="3xl"
          fontWeight="extrabold"
          letterSpacing="tight"
        >
          OWL Web
        </Heading>
        <Text fontSize="xl" mt={8}>
          Convert, analyze and merge ontologies from different formats
        </Text>
      </Flex>
      <Box my={12}>
        <Flex align="center" gap={3}>
          <Box textAlign="center">
            <Box
              className="fas fa-exchange-alt"
              fontSize="6xl"
              w="100px"
              color="green.400"
            />
          </Box>
          <Box>
            <Heading
              as="h3"
              size="lg"
              fontWeight="semibold"
              letterSpacing="tight"
            >
              Convert ontologies
            </Heading>
            <Text fontSize="md" mt={4}>
              OWL Web allows you to easily convert ontologies between different
              formats, saving you time and effort
            </Text>
          </Box>
        </Flex>
        <Flex align="center" mt={8} gap={3}>
          <Box textAlign="center">
            <Box
              className="fas fa-search"
              fontSize="6xl"
              w="100px"
              color="green.400"
            />
          </Box>
          <Box>
            <Heading
              as="h3"
              size="lg"
              fontWeight="semibold"
              letterSpacing="tight"
            >
              Analyze ontologies
            </Heading>
            <Text fontSize="md" mt={4}>
              With OWL Web, you can easily analyze ontologies in a file and get
              insights that help you make better decisions
            </Text>
          </Box>
        </Flex>
        <Flex align="center" mt={8} gap={3}>
          <Box textAlign="center">
            <Box
              className="fas fa-object-group"
              fontSize="6xl"
              w="100px"
              color="green.400"
            />
          </Box>
          <Box>
            <Heading
              as="h3"
              size="lg"
              fontWeight="semibold"
              letterSpacing="tight"
            >
              Merge ontologies
            </Heading>
            <Text fontSize="md" mt={4}>
              OWL Web makes it easy to merge ontologies from multiple files,
              giving you a complete view of your data
            </Text>
          </Box>
        </Flex>
      </Box>
    </Container>
  )
}

export default Home
