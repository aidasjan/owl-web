import React from 'react'
import { Box, CloseButton, Flex, Text, type BoxProps } from '@chakra-ui/react'
import NavItem from './NavItem'

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose }: SidebarProps) => {
  const items = [
    { title: 'Home', icon: 'fas fa-home', to: '/' },
    {
      title: 'Convert',
      icon: 'fas fa-exchange-alt',
      to: '/convert'
    }
  ]

  return (
    <Box
      w={{ base: 'full', md: 64 }}
      bg="green.400"
      pos="fixed"
      h="full"
      shadow="lg"
    >
      <Flex h={20} alignItems="center" mx={5} justifyContent="space-between">
        <Text fontSize="md" fontWeight="bold" textColor="white">
          OWL Web
        </Text>
        <CloseButton
          onClick={onClose}
          display={{ base: 'flex', lg: 'none' }}
          color="white"
        />
      </Flex>
      {items.map((item) => (
        <>
          <NavItem target={item.to} icon={item.icon} onClick={onClose}>
            {item.title}
          </NavItem>
        </>
      ))}
    </Box>
  )
}

export default SidebarContent
