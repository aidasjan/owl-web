import React from 'react'
import { Box, Flex, IconButton } from '@chakra-ui/react'

interface Props {
  onOpen: () => void
}

const Navbar = ({ onOpen }: Props) => {
  return (
    <>
      <Flex
        display={{ base: 'flex', lg: 'none' }}
        ml={{ base: 0, lg: 64 }}
        px={{ base: 4, lg: 24 }}
        height={16}
        alignItems="center"
        bg="green.400"
        justifyContent="flex-end"
      >
        <IconButton
          onClick={onOpen}
          ml={4}
          aria-label="menu"
          colorScheme="green"
          display={{ base: 'block', lg: 'none' }}
        >
          <Box className="fa fa-bars" />
        </IconButton>
      </Flex>
    </>
  )
}

export default Navbar
