import React from 'react'
import Head from './components/Head.jsx'
import Playground from './components/Playground.jsx'
import { Box } from '@chakra-ui/react'



const App = () => {
  return (
    <Box p={'relative'} h={'100vh'} bg={'black'}>
      <Head/>
      <Playground/>
    </Box>
  )
}

export default App
