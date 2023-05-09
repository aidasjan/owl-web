import React from 'react'
import { Box, Flex, Button } from '@chakra-ui/react'

const MAX_FILE_SIZE = 1 * 1024 * 1024

interface FileInputProps {
  id?: string
  selectedFiles: File[]
  isInvalid?: boolean
  isSingle?: boolean
  setSelectedFiles: (file: File[]) => void
}

const FileInput = ({
  id,
  selectedFiles,
  isInvalid,
  isSingle,
  setSelectedFiles
}: FileInputProps) => {
  const handleFileSelect = (e) => {
    e.preventDefault()
    const files = e.dataTransfer ? e.dataTransfer.files : e.target.files
    console.log(files)
    if (files.length > 0) {
      const file = files[0]
      if (file.size <= MAX_FILE_SIZE) {
        if (isSingle) {
          setSelectedFiles([file])
        } else {
          setSelectedFiles([...selectedFiles, file])
        }
      }
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    handleFileSelect(e)
  }

  const handleRemove = (file) => {
    if (!selectedFiles) {
      return
    }
    console.log(selectedFiles)
    setSelectedFiles(selectedFiles.filter((f) => f.name !== file.name))
  }

  return (
    <>
      <Box
        border="1px dashed gray"
        borderRadius="xl"
        p={4}
        textAlign="center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Flex justifyContent="center" alignItems="center">
          <Box mr={2}>Drag files here or</Box>
          <Button
            as="label"
            htmlFor={id ?? 'file-input'}
            size="sm"
            cursor="pointer"
          >
            Browse
          </Button>
          <input
            id={id ?? 'file-input'}
            type="file"
            hidden
            onChange={handleFileSelect}
          />
        </Flex>
        <Box fontSize="sm" mt={2}>
          Max file size: {MAX_FILE_SIZE / 1024 / 1024} MB
        </Box>
        <Flex fontSize="sm" mt={2} justifyContent="center" gap={1}>
          <Box>Supported file types:</Box>
          <Box fontWeight="bold">rdf, owx, ttl, omn, ofn</Box>
        </Flex>
      </Box>
      {selectedFiles?.map((file) => (
        <Flex
          mt={1}
          p={6}
          backgroundColor="gray.100"
          justify="space-between"
          align="center"
          borderRadius="xl"
          key={file.name}
        >
          <Box>
            <Box fontSize="sm">Selected File</Box>
            <Box fontWeight="bold">{file.name}</Box>
          </Box>
          <Button
            p={0}
            colorScheme="red"
            variant="ghost"
            _hover={{ bg: 'transparent' }}
            onClick={() => {
              handleRemove(file)
            }}
          >
            <Box mr={3} className="fas fa-times fa-lg" color="red.500" />
            Remove
          </Button>
        </Flex>
      ))}
      {isInvalid && (
        <Box mt={1} color="red" fontSize="sm" fontWeight="bold">
          File is required
        </Box>
      )}
    </>
  )
}

export default FileInput
