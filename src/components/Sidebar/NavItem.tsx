import React, { type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flex, Box } from '@chakra-ui/react'

interface NavItemProps {
  target?: string
  icon?: string
  children: ReactNode
  onClick: () => void
}

const NavItem = ({ children, icon, target, onClick }: NavItemProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (target) {
      navigate(target)
    }
    onClick()
  }

  return (
    <Flex
      align="center"
      p={3}
      mx={4}
      role="group"
      color="gray.50"
      cursor={target ? 'pointer' : undefined}
      onClick={handleClick}
      _hover={
        target
          ? {
              color: 'green.200'
            }
          : undefined
      }
    >
      {icon && <Box className={icon} w={8}></Box>}
      {children}
    </Flex>
  )
}

export default NavItem
