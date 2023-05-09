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
    },
    {
      title: 'Merge',
      icon: 'fas fa-object-group',
      to: '/merge'
    },
    {
      title: 'Analyze',
      icon: 'fas fa-search',
      children: [
        {
          title: 'Individuals',
          to: '/analyze/individuals'
        },
        {
          title: 'Declarations',
          to: '/analyze/declarations'
        }
      ]
    },
    {
      title: 'API',
      icon: 'fas fa-code',
      to: '/api'
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
          {item.to && (
            <NavItem target={item.to} icon={item.icon} onClick={onClose}>
              {item.title}
            </NavItem>
          )}
          {item.children && (
            <>
              <NavItem icon={item.icon} onClick={onClose}>
                {item.title}
              </NavItem>
              <Box pl={6}>
                {item.children.map((subitem) => (
                  <NavItem
                    key={subitem.title}
                    target={subitem.to}
                    icon="fas fa-chevron-right"
                    onClick={onClose}
                  >
                    {subitem.title}
                  </NavItem>
                ))}
              </Box>
            </>
          )}
        </>
      ))}
    </Box>
  )
}

export default SidebarContent
