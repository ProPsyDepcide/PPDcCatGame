
import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Image, Input, Radio, RadioGroup, Stack, Text, useDisclosure } from '@chakra-ui/react';
import s from './style.module.css';
import useSound from "use-sound";
import sfx from '../../public/mp3/plyunk.mp3';
import stena from '../assets/images/wall.png';
import stena2 from '../assets/images/block.png';
import Vasyka from '../assets/images/Vasyka.png';
import Rijik from '../assets/images/Rijik.png';
import Maxwell from '../assets/images/max.png';
import Grisha from '../assets/images/fatcat.png';
import ErroR from '../assets/images/aftontextureerror.png';
import Tipsik from '../assets/images/CatTipsi.png';
import Dumka from '../assets/images/dumka.png';
import Sayuri from '../assets/images/sayoriKitty.png';
import eda from '../assets/images/milk.png'
import eda2 from '../assets/images/fish.png'



const Playground = () => {


  //============================================/ Рандомизация Координат /========================================================== 
  const [RunX, setRunX] = useState(0)
  const [RunY, setRunY] = useState(0)
  const [Col, setCol] = useState([])
  const [Eat, setEat] = useState([])
  const [Count, setCount] = useState(() => {
    const storedCount = localStorage.getItem('schet')
    return storedCount ? parseInt(storedCount, 10) : 0;
  })

  useEffect(() => {
    localStorage.setItem('schet', Count.toString())
  }, [Count])

  useEffect(() => {

    function getRandomInt(max) {
      return Math.floor(Math.random() * max)
    }

    const blocks = []
    for (let i = 0; i < 15; i++) {
      let randomX = getRandomInt(13) * 100
      let randomY = getRandomInt(5) * 100
      while (randomX === 0 && randomY === 0) {
        randomX = getRandomInt(13) * 100
        randomY = getRandomInt(5) * 100
      }
      blocks.push({ top: randomY, left: randomX })
    }

    setCol(blocks)
  }, [])



  useEffect(() => {
    function getRandomInt(max) {
      return Math.floor(Math.random() * max)
    }

    const foods = []
    for (let i = 0; i < 10; i++) {
      let randmX = getRandomInt(13) * 100;
      let randmY = getRandomInt(5) * 100;

      //================================================================================================================================ 
      //===============================================/ защита от повтора /==========================================================

      for (const block of Col) {
        if (block.top === randmY && block.left === randmX) {
          randmX = getRandomInt(13) * 100;
          randmY = getRandomInt(5) * 100;
        }
      }

      for (const block of Col) {
        if (block.top === randmY && block.left === randmX) {
          randmX = getRandomInt(13) * 100;
          randmY = getRandomInt(5) * 100;
        }
      }

      for (const block of Col) {
        if (block.top === randmY && block.left === randmX) {
          randmX = getRandomInt(13) * 100;
          randmY = getRandomInt(5) * 100;
        }
      }

      for (const block of Col) {
        if (block.top === randmY && block.left === randmX) {
          randmX = getRandomInt(13) * 100;
          randmY = getRandomInt(5) * 100;
        }
      }


      while (randmX === 0 && randmY === 0) {
        randmX = getRandomInt(13) * 100;
        randmY = getRandomInt(5) * 100;
      }
      foods.push({ top: randmY, left: randmX })
    }

    setEat(foods)
  }, [Col])


  //================================================================================================================================ 
  //===============================================/ Движение на клавиши /========================================================== 


  useEffect(() => {
    const handleKeyPress = (e) => {

      if (e.key === 'r' || e.key === 'к') {
        location.reload()
      }

      if (e.key === 'd' || e.key === 'в') {
        if (RunX <= 1100) {
          const nextX = RunX + 100
          if (!checkCollision(nextX, RunY)) {
            setRunX(nextX)
          }
        }
      }
      if (e.key === 'a' || e.key === 'ф') {
        if (RunX >= 5) {
          const nextX = RunX - 100
          if (!checkCollision(nextX, RunY)) {
            setRunX(nextX)
          }
        }
      }
      if (e.key === 'w' || e.key === 'ц') {
        if (RunY > 0) {
          const nextY = RunY - 100
          if (!checkCollision(RunX, nextY)) {
            setRunY(nextY)
          }
        }
      }
      if (e.key === 's' || e.key === 'ы') {
        if (RunY <= 300) {
          const nextY = RunY + 100
          if (!checkCollision(RunX, nextY)) {
            setRunY(nextY)
          }
        }
      }
    }

    //================================================================================================================================ 
    //=====================================================/ Колизия /================================================================ 

    const checkCollision = (nextX, nextY) => {
      for (let i = 0; i < Col.length; i++) {
        const wall = Col[i]
        if (
          nextX < wall.left + 100 &&
          nextX + 100 > wall.left &&
          nextY < wall.top + 100 &&
          nextY + 100 > wall.top
        ) {
          return true
        }
      }
      return false
    }

    for (const food of Eat) {
      if (food.top === RunY && food.left === RunX) {
        Eat.splice(Eat.indexOf(food), 1)
        const plus = Count + 1
        setCount(plus)
        play()
      }
    }


    document.addEventListener('keypress', handleKeyPress)

    return () => {
      document.removeEventListener('keypress', handleKeyPress)
    }

  }, [RunX, RunY])

  //================================================================================================================================ 
  //=======================================================/ Объекты /==============================================================

  const [play] = useSound(sfx)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [placement, setPlacement] = React.useState('bottom')
  const [wall1, setwall1] = useState(true)
  const [wall2, setwall2] = useState(false)
  const [milk1, setmilk1] = useState(true)
  const [milk2, setmilk2] = useState(false)
  const [texture, settexture] = useState(true)
  const [texture2, settexture2] = useState(false)
  const [showBackground, setShowBackground] = useState(false);


  const wallchange = () => {
    setShowBackground(!showBackground);
    setwall1(false)
    settexture(false)
    setwall2(true)
    settexture2(true)
    setmilk1(false)
    setmilk2(true)
    localStorage.setItem('textstate', 1)
  }

  const wallchange2 = () => {
    setShowBackground(false);
    setwall1(true)
    settexture(true)
    setwall2(false)
    settexture2(false)
    setmilk1(true)
    setmilk2(false)
    localStorage.setItem('textstate', 0)
  }


  useEffect(() => {
    const textstatus = localStorage.getItem('textstate')
    if (textstatus == 1) {
      setShowBackground(!showBackground)
      setwall1(false)
      settexture(false)
      setwall2(true)
      settexture2(true)
      setmilk1(false)
      setmilk2(true)
    } else if (textstatus == 0) {
      setShowBackground(false)
      setwall1(true)
      settexture(true)
      setwall2(false)
      settexture2(false)
      setmilk1(true)
      setmilk2(false)
    }
  }, [])
  //=======================================================/ Коты /==============================================================

  const [vasyka, setVasyka] = useState(true)
  const [rijik, setRijik] = useState(false)
  const [dumka, setDumka] = useState(false)
  const [maxwell, setMaxwell] = useState(false)
  const [grishka, setGrishka] = useState(false)
  const [ERROR, setERROR] = useState(false)
  const [TIPSI, setTIPSI] = useState(false)
  const [Sayori, setSayori] = useState(false)

  const VasykaState = () => {
    localStorage.setItem('kotstate', 0)
    setVasyka(true)
    setRijik(false)
    setDumka(false)
    setGrishka(false)
    setERROR(false)
    setMaxwell(false)
    setSayori(false)
    setTIPSI(false)
  }

  //=======================================================/ Система покупки Рыжика /==============================================================
  const [boughtrijik, setboughtRijik] = useState(false)
  const [canbuy, setcanbuy] = useState(false)
  const [cantbuy, setcantbuy] = useState(true)

  const minusCount = () => {
    localStorage.setItem('boughtRijik', true)
    const minus = Count - 150
    setCount(minus)
    setcanbuy(false)
    setcantbuy(false)
    setboughtRijik(true)
    location.reload()
  }

  const RijikState = () => {
    localStorage.setItem('kotstate', 1)
    setVasyka(false)
    setRijik(true)
    setDumka(false)
    setGrishka(false)
    setSayori(false)
    setMaxwell(false)
    setERROR(false)
    setTIPSI(false)
  }

  useEffect(() => {
    const bought = localStorage.getItem('boughtRijik')
    if (Count > 149 && bought !== 'true') {
      setcanbuy(true)
      setcantbuy(false)
    }

  }, [Count])

  useEffect(() => {
    const bought = localStorage.getItem('boughtRijik')
    if (bought === 'true') {
      setboughtRijik(true)
      setcanbuy(false)
      setcantbuy(false)
    }
  }, []);

  //=======================================================/ Система покупки Думки /==============================================================

  const [boughtDumka, setboughtDumka] = useState(false)
  const [canbuydumka, setcanbuydumka] = useState(false)
  const [cantbuydumka, setcantbuydumka] = useState(true)

  const minusCountDumka = () => {
    localStorage.setItem('boughtDumka', true)
    const minusD = Count - 500
    setCount(minusD)
    setcanbuydumka(false)
    setcantbuydumka(false)
    setboughtDumka(true)
    location.reload()
  }

  const Dumkastate = () => {
    localStorage.setItem('kotstate', 2)
    setVasyka(false)
    setRijik(false)
    setSayori(false)
    setDumka(true)
    setTIPSI(false)
    setGrishka(false)
    setMaxwell(false)
    setERROR(false)
  }

  useEffect(() => {
    const boughtdumka = localStorage.getItem('boughtDumka')
    if (Count > 499 && boughtdumka !== 'true') {
      setcanbuydumka(true)
      setcantbuydumka(false)
    }

  }, [Count])

  useEffect(() => {
    const boughtdumka = localStorage.getItem('boughtDumka')
    if (boughtdumka === 'true') {
      setboughtDumka(true)
      setcanbuydumka(false)
      setcantbuydumka(false)
    }
  }, []);

  //=======================================================/ Система покупки Максвела /==============================================================

  const [boughtMaxwell, setboughtMaxwell] = useState(false)
  const [canbuyMaxwell, setcanbuyMaxwell] = useState(false)
  const [cantbuyMaxwell, setcantbuyMaxwell] = useState(true)

  const minusCountMaxwell = () => {
    localStorage.setItem('boughtMaxwell', true)
    const minusM = Count - 700
    setCount(minusM)
    setcanbuyMaxwell(false)
    setcantbuyMaxwell(false)
    setboughtMaxwell(true)
    location.reload()
  }

  const Maxwellstate = () => {
    localStorage.setItem('kotstate', 3)
    setVasyka(false)
    setRijik(false)
    setDumka(false)
    setMaxwell(true)
    setERROR(false)
    setSayori(false)
    setTIPSI(false)
    setGrishka(false)
  }

  useEffect(() => {
    const boughtMaxwell = localStorage.getItem('boughtMaxwell')
    if (Count > 699 && boughtMaxwell !== 'true') {
      setcanbuyMaxwell(true)
      setcantbuyMaxwell(false)
    }

  }, [Count])

  useEffect(() => {
    const boughtMaxwell = localStorage.getItem('boughtMaxwell')
    if (boughtMaxwell === 'true') {
      setboughtMaxwell(true)
      setcanbuyMaxwell(false)
      setcantbuyMaxwell(false)
    }
  }, []);
  //=======================================================/ Система покупки Гришки /==============================================================

  const [boughtGrishka, setboughtGrishka] = useState(false)
  const [canbuyGrishka, setcanbuyGrishka] = useState(false)
  const [cantbuyGrishka, setcantbuyGrishka] = useState(true)

  const minusCountGrishka = () => {
    localStorage.setItem('boughtGrishka', true)
    const minusM = Count - 900
    setCount(minusM)
    setcanbuyGrishka(false)
    setcantbuyGrishka(false)
    setboughtGrishka(true)
    location.reload()
  }

  const Grishkastate = () => {
    localStorage.setItem('kotstate', 4)
    setVasyka(false)
    setRijik(false)
    setDumka(false)
    setMaxwell(false)
    setERROR(false)
    setTIPSI(false)
    setSayori(false)
    setGrishka(true)
  }

  useEffect(() => {
    const boughtGrishka = localStorage.getItem('boughtGrishka')
    if (Count > 899 && boughtGrishka !== 'true') {
      setcanbuyGrishka(true)
      setcantbuyGrishka(false)
    }

  }, [Count])

  useEffect(() => {
    const boughtGrishka = localStorage.getItem('boughtGrishka')
    if (boughtGrishka === 'true') {
      setboughtGrishka(true)
      setcanbuyGrishka(false)
      setcantbuyGrishka(false)
    }
  }, []);
  //=======================================================/ Система покупки ERROR /==============================================================

  const [boughtERROR, setboughtERROR] = useState(false)
  const [canbuyERROR, setcanbuyERROR] = useState(false)
  const [cantbuyERROR, setcantbuyERROR] = useState(true)

  const minusCountERROR = () => {
    localStorage.setItem('boughtERROR', true)
    const minusE = Count - 1200
    setCount(minusE)
    setcanbuyERROR(false)
    setcantbuyERROR(false)
    setboughtERROR(true)
    location.reload()
  }

  const ERRORstate = () => {
    localStorage.setItem('kotstate', 5)
    setVasyka(false)
    setRijik(false)
    setDumka(false)
    setMaxwell(false)
    setSayori(false)
    setGrishka(false)
    setERROR(true)
    setTIPSI(false)
  }

  useEffect(() => {
    const boughtERROR = localStorage.getItem('boughtERROR')
    if (Count > 1199 && boughtERROR !== 'true') {
      setcanbuyERROR(true)
      setcantbuyERROR(false)
    }

  }, [Count])

  useEffect(() => {
    const boughtERROR = localStorage.getItem('boughtERROR')
    if (boughtERROR === 'true') {
      setboughtERROR(true)
      setcanbuyERROR(false)
      setcantbuyERROR(false)
    }
  }, []);
  //=======================================================/ Система покупки Типси /==============================================================

  const [boughtTIPSI, setboughtTIPSI] = useState(false)
  const [canbuyTIPSI, setcanbuyTIPSI] = useState(false)
  const [cantbuyTIPSI, setcantbuyTIPSI] = useState(true)

  const minusCountTIPSI = () => {
    localStorage.setItem('boughtTIPSI', true)
    const minusT = Count - 1500
    setCount(minusT)
    setcanbuyTIPSI(false)
    setcantbuyTIPSI(false)
    setboughtTIPSI(true)
    location.reload()
  }

  const TIPSIstate = () => {
    localStorage.setItem('kotstate', 6)
    setVasyka(false)
    setRijik(false)
    setDumka(false)
    setMaxwell(false)
    setGrishka(false)
    setERROR(false)
    setSayori(false)
    setTIPSI(true)
  }

  useEffect(() => {
    const boughtTIPSI = localStorage.getItem('boughtTIPSI')
    if (Count > 1499 && boughtTIPSI !== 'true') {
      setcanbuyTIPSI(true)
      setcantbuyTIPSI(false)
    }

  }, [Count])

  useEffect(() => {
    const boughtTIPSI = localStorage.getItem('boughtTIPSI')
    if (boughtTIPSI === 'true') {
      setboughtTIPSI(true)
      setcanbuyTIPSI(false)
      setcantbuyTIPSI(false)
    }
  }, []);
  //=======================================================/ Система покупки Сайори /==============================================================

  const [boughtSayori, setboughtSayori] = useState(false)
  const [canbuySayori, setcanbuySayori] = useState(false)
  const [cantbuySayori, setcantbuySayori] = useState(true)

  const minusCountSayori = () => {
    localStorage.setItem('boughtSayori', true)
    const minusS = Count - 2000
    setCount(minusS)
    setcanbuySayori(false)
    setcantbuySayori(false)
    setboughtSayori(true)
    location.reload()
  }

  const Sayoristate = () => {
    localStorage.setItem('kotstate', 7)
    setVasyka(false)
    setRijik(false)
    setDumka(false)
    setMaxwell(false)
    setGrishka(false)
    setERROR(false)
    setTIPSI(false)
    setSayori(true)
  }

  useEffect(() => {
    const boughtSayori = localStorage.getItem('boughtSayori')
    if (Count > 1499 && boughtSayori !== 'true') {
      setcanbuySayori(true)
      setcantbuySayori(false)
    }

  }, [Count])

  useEffect(() => {
    const boughtSayori = localStorage.getItem('boughtSayori')
    if (boughtSayori === 'true') {
      setboughtSayori(true)
      setcanbuySayori(false)
      setcantbuySayori(false)
    }
  }, []);
  //=================================================================================================================================================

  useEffect(() => {
    const kotstatus = localStorage.getItem('kotstate')
    if (kotstatus == 1) {
      setVasyka(false)
      setSayori(false)
      setRijik(true)
      setDumka(false)
      setERROR(false)
      setMaxwell(false)
      setGrishka(false)
      setTIPSI(false)
    } else if (kotstatus == 0) {
      setVasyka(true)
      setDumka(false)
      setSayori(false)
      setRijik(false)
      setMaxwell(false)
      setERROR(false)
      setGrishka(false)
      setTIPSI(false)
    } else if (kotstatus == 2) {
      setDumka(true)
      setRijik(false)
      setSayori(false)
      setVasyka(false)
      setMaxwell(false)
      setERROR(false)
      setGrishka(false)
      setTIPSI(false)
    } else if (kotstatus == 3) {
      setRijik(false)
      setMaxwell(true)
      setSayori(false)
      setVasyka(false)
      setDumka(false)
      setERROR(false)
      setGrishka(false)
      setTIPSI(false)
    } else if (kotstatus == 4) {
      setRijik(false)
      setMaxwell(false)
      setVasyka(false)
      setDumka(false)
      setSayori(false)
      setERROR(false)
      setGrishka(true)
      setTIPSI(false)
    } else if (kotstatus == 5) {
      setRijik(false)
      setMaxwell(false)
      setVasyka(false)
      setDumka(false)
      setGrishka(false)
      setSayori(false)
      setERROR(true)
      setTIPSI(false)
    } else if (kotstatus == 6) {
      setRijik(false)
      setMaxwell(false)
      setVasyka(false)
      setDumka(false)
      setGrishka(false)
      setERROR(false)
      setTIPSI(true)
      setSayori(false)
    } else if (kotstatus == 7) {
      setRijik(false)
      setMaxwell(false)
      setVasyka(false)
      setDumka(false)
      setGrishka(false)
      setERROR(false)
      setTIPSI(false)
      setSayori(true)
    }
    console.log(kotstatus)
  }, [])


  return (
    <>
      <Box w={'20%'} position={'absolute'} left={'3%'} top={'7%'}>
        <Text pl={'0%'} fontSize={'30px'} className={s.fontCat} color={'#00ffff'}>
          Счет: {Count}
        </Text>
        <Text className={s.fontCat} color={'#00ffff'}>R - Далее</Text>
      </Box>
      <Button pos={'absolute'} top={'7%'} right={'3%'} color={'black'} bg={'#00ffff'} onClick={onOpen}>Спрайты</Button>

      <Box bg={showBackground ? '#00BC00' : 'black'} boxShadow='outline' p='6' rounded='md' position={'relative'} mt={'1%'} ml={'30px'} w={'1300px'} h={'500px'}>

        {vasyka &&
          <Image
            transition={'.4s ease'}
            top={RunY + 'px'}
            left={RunX + 'px'}
            className='coshka'
            position={'absolute'}
            w={'100px'}
            src={Vasyka}
          />
        }
        {rijik &&
          <Image
            transition={'.4s ease'}
            top={RunY + 'px'}
            left={RunX + 'px'}
            className='coshka'
            position={'absolute'}
            w={'100px'}
            src={Rijik}
          />
        }
        {dumka &&
          <Image
            transition={'.4s ease'}
            top={RunY + 'px'}
            left={RunX + 'px'}
            className='coshka'
            position={'absolute'}
            w={'100px'}
            src={Dumka}
          />
        }
        {maxwell &&
          <Image
            transition={'.4s ease'}
            top={RunY + 'px'}
            left={RunX + 'px'}
            className='coshka'
            position={'absolute'}
            w={'100px'}
            src={Maxwell}
          />
        }
        {grishka &&
          <Image
            transition={'.4s ease'}
            top={RunY + 'px'}
            left={RunX + 'px'}
            className='coshka'
            position={'absolute'}
            w={'100px'}
            src={Grisha}
          />
        }
        {ERROR &&
          <Image
            transition={'.4s ease'}
            top={RunY + 'px'}
            left={RunX + 'px'}
            className='coshka'
            position={'absolute'}
            w={'100px'}
            src={ErroR}
          />
        }
        {TIPSI &&
          <Image
            transition={'.4s ease'}
            top={RunY + 'px'}
            left={RunX + 'px'}
            className='coshka'
            position={'absolute'}
            w={'100px'}
            src={Tipsik}
          />
        }
        {Sayori &&
          <Image
            transition={'.4s ease'}
            top={RunY + 'px'}
            left={RunX + 'px'}
            className='coshka'
            position={'absolute'}
            w={'100px'}
            src={Sayuri}
          />
        }

        {Col.map((wall, index) => (
          wall1 &&
          <Image src={stena} key={index} top={wall.top + 'px'} left={wall.left + 'px'} position={'absolute'} h={'100px'} w={'100px'} Image />
        ))}

        {Col.map((wall, index) => (
          wall2 &&
          <Image src={stena2} key={index} top={wall.top + 'px'} left={wall.left + 'px'} position={'absolute'} h={'100px'} w={'100px'} Image />
        ))}


        {Eat.map((food, index) => (
          milk1 &&
          <Image src={eda} key={index} top={food.top + 'px'} left={food.left + 'px'} position={'absolute'} h={'100px'} w={'100px'} Image />
        ))}

        {Eat.map((food, index) => (
          milk2 &&
          <Image src={eda2} key={index} top={food.top + 'px'} left={food.left + 'px'} position={'absolute'} h={'100px'} w={'100px'} Image />
        ))}

      </Box>

      {/* //================================================================================================================================  */}
      {/* //=======================================================/ нижняя панель /================================================================  */}

      <RadioGroup defaultValue={placement} onChange={setPlacement}>
        <Stack direction='row' mb='4'>
        </Stack>
      </RadioGroup>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent borderRadius={'10px'} border={'2px solid #00ffff'} bg={'black'}>
          <DrawerHeader className={s.fontCat} color={'#00ffff'} borderBottom='1px solid #00ffff'>Спрайты</DrawerHeader>
          <Flex pl={'2%'} pt={'2%'} gap={'30px'}>
            {texture &&
              <Button fontSize={'12'} w={'110px'} color={'black'} bg={'#00ffff'} onClick={wallchange}>Сменить текстуры</Button>
            }
            {texture2 &&
              <Button fontSize={'12'} w={'110px'} color={'black'} bg={'#7fff00'} onClick={wallchange2}>Сменить текстуры</Button>
            }

            <Box pb={'2%'}>
              <Text pt={'10px'} color={'#00ffff'} className={s.fontCat} textAlign={'center'}>начальный</Text>
              <Image onClick={VasykaState} w={'120px'} h={'120px'} src={Vasyka} />
              <Text pt={'10px'} color={'#00ffff'} className={s.fontCat} textAlign={'center'}>Васька</Text>
            </Box>
            {/* ===================================================| купить Рыжика |==================================================================================== */}
            <Box pb={'2%'}>
              <Text pt={'10px'} color={'#00ffff'} className={s.fontCat} textAlign={'center'}>150</Text>
              {cantbuy &&
                <Button mb={'45%'} mt={'45%'} disabled={true} bg={'gray'}>Купить</Button>
              }
              {canbuy &&
                <Button mb={'45%'} onClick={minusCount} mt={'45%'} bg={'#00ffff'}>Купить</Button>
              }
              {boughtrijik &&
                <Image onClick={RijikState} w={'120px'} h={'120px'} src={Rijik} />
              }
              <Text pt={'10px'} color={'#00ffff'} className={s.fontCat} textAlign={'center'}>Рыжик</Text>
            </Box>
            {/* ===================================================| купить Думкку |==================================================================================== */}
            <Box pb={'2%'}>
              <Text pt={'10px'} color={'#00ffff'} className={s.fontCat} textAlign={'center'}>500</Text>
              {cantbuydumka &&
                <Button mb={'45%'} mt={'45%'} disabled={true} bg={'gray'}>Купить</Button>
              }
              {canbuydumka &&
                <Button mb={'45%'} onClick={minusCountDumka} mt={'45%'} bg={'#00ffff'}>Купить</Button>
              }
              {boughtDumka &&
                <Image onClick={Dumkastate} w={'120px'} h={'120px'} src={Dumka} />
              }
              <Text pt={'10px'} color={'#00ffff'} className={s.fontCat} textAlign={'center'}>Думка</Text>
            </Box>
            {/* ===================================================| купить Максвела |==================================================================================== */}
            <Box pb={'2%'}>
              <Text pt={'10px'} color={'#00ffff'} className={s.fontCat} textAlign={'center'}>700</Text>
              {cantbuyMaxwell &&
                <Button mb={'45%'} mt={'45%'} disabled={true} bg={'gray'}>Купить</Button>
              }
              {canbuyMaxwell &&
                <Button mb={'45%'} onClick={minusCountMaxwell} mt={'45%'} bg={'#00ffff'}>Купить</Button>
              }
              {boughtMaxwell &&
                <Image onClick={Maxwellstate} w={'120px'} h={'120px'} src={Maxwell} />
              }
              <Text pt={'10px'} color={'#00ffff'} className={s.fontCat} textAlign={'center'}>Максвел</Text>
            </Box>
            {/* ===================================================| купить Гришку |==================================================================================== */}
            <Box pb={'2%'}>
              <Text pt={'10px'} color={'#00ffff'} className={s.fontCat} textAlign={'center'}>900</Text>
              {cantbuyGrishka &&
                <Button mb={'45%'} mt={'45%'} disabled={true} bg={'gray'}>Купить</Button>
              }
              {canbuyGrishka &&
                <Button mb={'45%'} onClick={minusCountGrishka} mt={'45%'} bg={'#00ffff'}>Купить</Button>
              }
              {boughtGrishka &&
                <Image onClick={Grishkastate} w={'120px'} h={'120px'} src={Grisha} />
              }
              <Text pt={'10px'} color={'#00ffff'} className={s.fontCat} textAlign={'center'}>Гришка</Text>
            </Box>
            {/* ===================================================| купить ERROR |==================================================================================== */}
            <Box pb={'2%'}>
              <Text pt={'10px'} color={'#00ffff'} className={s.fontCat} textAlign={'center'}>1200</Text>
              {cantbuyERROR &&
                <Button mb={'45%'} mt={'45%'} disabled={true} bg={'gray'}>Купить</Button>
              }
              {canbuyERROR &&
                <Button mb={'45%'} onClick={minusCountERROR} mt={'45%'} bg={'#00ffff'}>Купить</Button>
              }
              {boughtERROR &&
                <Image onClick={ERRORstate} w={'120px'} h={'120px'} src={ErroR} />
              }
              <Text pt={'10px'} color={'#00ffff'} className={s.fontCat} textAlign={'center'}>ERROR</Text>
            </Box>
            {/* ===================================================| купить Типси |==================================================================================== */}
            <Box pb={'2%'}>
              <Text pt={'10px'} color={'#00ffff'} className={s.fontCat} textAlign={'center'}>1500</Text>
              {cantbuyTIPSI &&
                <Button mb={'45%'} mt={'45%'} disabled={true} bg={'gray'}>Купить</Button>
              }
              {canbuyTIPSI &&
                <Button mb={'45%'} onClick={minusCountTIPSI} mt={'45%'} bg={'#00ffff'}>Купить</Button>
              }
              {boughtTIPSI &&
                <Image onClick={TIPSIstate} w={'120px'} h={'120px'} src={Tipsik} />
              }
              <Text pt={'10px'} color={'#00ffff'} className={s.fontCat} textAlign={'center'}>Типси</Text>
            </Box>
            {/* ===================================================| купить Сайори |==================================================================================== */}
            <Box pb={'2%'}>
              <Text pt={'10px'} color={'#00ffff'} className={s.fontCat} textAlign={'center'}>2000</Text>
              {cantbuySayori &&
                <Button mb={'45%'} mt={'45%'} disabled={true} bg={'gray'}>Купить</Button>
              }
              {canbuySayori &&
                <Button mb={'45%'} onClick={minusCountSayori} mt={'45%'} bg={'#00ffff'}>Купить</Button>
              }
              {boughtSayori &&
                <Image onClick={Sayoristate} w={'120px'} h={'120px'} src={Sayuri} />
              }
              <Text pt={'10px'} color={'#00ffff'} className={s.fontCat} textAlign={'center'}>Сайори</Text>
            </Box>
            {/* ===================================================================================================================================================== */}
          </Flex>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Playground