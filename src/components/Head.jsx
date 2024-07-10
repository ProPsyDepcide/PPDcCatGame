import { Box, Button, Container, Flex, Image, Text, Link, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import s from './style.module.css'
import useSound from 'use-sound'
import nej from '/public/mp3/kkot.mp3'


const Head = () => {
  const [changelogo, setchangelogo] = useState(false);
  const [play] = useSound(nej)
  const playmusic = () =>{
    setchangelogo(!changelogo)
  }
  return (
    <Box>
      <Flex alignItems={'center'}>
        <Container border={'3px solid #00ffff'} mt={'0.5%'} p={'10px 50px 10px 50px'} borderRadius={'10px'} maxW={'container.md'} >
          <Flex justifyContent={'space-between'} alignItems={'center'}>
            <Image onClick={play} className='logo' w={'100px'} src={ changelogo ? "/public/cot2.png" : "/public/cot.png"} />
            <Text onClick={playmusic} className={s.fontCat} color={'#00ffff'} fontSize={'30'} >у меня живет культурный кот</Text>
          </Flex>
        </Container>
      </Flex>
    </Box>
  )

}

export default Head