import React, { useCallback } from 'react'
import { Box, Flex, Button } from '@chakra-ui/react'

const MAX_FILE_SIZE = 10 * 1024 * 1024

interface FileInputProps {
  id?: string
  selectedFile: File | null
  isInvalid?: boolean
  setSelectedFile: (file: File | null) => void
}

const FileInput = ({
  id,
  selectedFile,
  isInvalid,
  setSelectedFile
}: FileInputProps) => {
  const handleFileSelect = useCallback(
    (e) => {
      e.preventDefault()
      const files = e.dataTransfer ? e.dataTransfer.files : e.target.files
      if (files.length > 0) {
        const file = files[0]
        if (file.size <= MAX_FILE_SIZE) {
          setSelectedFile(file)
        }
      }
    },
    [setSelectedFile]
  )

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
  }, [])

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      handleFileSelect(e)
    },
    [handleFileSelect]
  )

  const handleRemove = useCallback(() => {
    setSelectedFile(null)
  }, [setSelectedFile])

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
          Max file size: 10 MB
        </Box>
      </Box>
      {selectedFile && (
        <Flex
          mt={1}
          p={6}
          backgroundColor="gray.100"
          justify="space-between"
          align="center"
          borderRadius="xl"
        >
          <Box>
            <Box fontSize="sm">Selected File</Box>
            <Box fontWeight="bold">{selectedFile.name}</Box>
          </Box>
          <Button
            p={0}
            colorScheme="red"
            variant="ghost"
            _hover={{ bg: 'transparent' }}
            onClick={handleRemove}
          >
            <Box mr={3} className="fas fa-times fa-lg" color="red.500" />
            Remove
          </Button>
        </Flex>
      )}
      {isInvalid && (
        <Box mt={1} color="red" fontSize="sm" fontWeight="bold">
          File is required
        </Box>
      )}
    </>
  )
}

export default FileInput
