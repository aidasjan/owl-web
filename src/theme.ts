import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false
  },
  fonts: {
    heading: 'Open Sans, sans-serif',
    body: 'Open Sans, sans-serif'
  }
})
