import React, { useContext, useState } from 'react';
import { Box, Button, Center, FormControl, keyframes,Flex,Image,FormLabel, Link,HStack, Input, Stack, Text, useColorMode, useColorModeValue, useBreakpointValue } from '@chakra-ui/react';
import { FaGoogle, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate ,useLocation} from 'react-router-dom';
import { Context } from '../index';
import img from "../Assests/CC.png"

const MotionBox = motion(Box);

const TechReg = () => {
  const {setTeIsAuthenticated} = useContext(Context)
  const location = useLocation();
  const item = location.state || '';
  console.log(item+"hiiiiiiiii")

  const { toggleColorMode } = useColorMode();
  const formBg = useColorModeValue('white', 'gray.700');
  const buttonBg = useColorModeValue('blue.500', 'blue.200');
  const buttonHoverBg = useColorModeValue('blue.600', 'blue.300');
  const navigate = useNavigate();
  
  const boxWidth = useBreakpointValue({ base: '90%', md: '500px' });
  const boxHeight = useBreakpointValue({ base: 'auto', md: '540px' });

  // State to capture form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const colorChange = keyframes`
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
`;

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const res = await fetch('https://collegeconnect-backend.onrender.com/registerr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Include credentials (cookies) in the request

        body: JSON.stringify({ name, email, password })
      });
   setTeIsAuthenticated(true);
      const data = await res.json();
      navigate('/detT',{state:{email,name}})
      if (res.status === 201) {
        setMessage(data.success);
        
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Registration failed');
    }
  };

  return (
    <Center minH="100vh" bg={useColorModeValue('gray.100', 'gray.800')}>
     <Flex 
        direction={{ base: 'column', md: 'row' }} 
        align="center" 
        justify="center" 
        mr={-10}
        gap={120}
        width="100%" 
        maxW="1200px"
      >
      <MotionBox 
        p={8} 
        width={boxWidth} 
        borderWidth={1} 
        borderRadius="lg" 
        height={boxHeight}
        boxShadow="lg" 
        bg={formBg} 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition="0.5s"
        as="form" // Mark this box as a form
        onSubmit={handleSubmit} // Submit form handler
      >
        <Text fontSize="2xl" mb={6} textAlign="center">Register</Text>
        <Stack spacing={4}>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input 
              type="text" 
              placeholder="Enter your name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input 
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </FormControl>
          <Button 
            bg={buttonBg} 
            color="white" 
            size="lg" 
            mt={4} 
            _hover={{ bg: buttonHoverBg }}
            transition="0.3s"
            type="submit" // Set the button type to "submit"
          >
            Register
          </Button>
          
          {message && <Text color="red.500" mt={2}>{message}</Text>}
          <Text textAlign="center" mt={6}>
            Already registered? <Link color="blue.500" onClick={() => navigate('/Tlogin')}>Login</Link>
          </Text>
        </Stack>
      </MotionBox>
      <Box  mt={{ base: 8, md: 0 }} ml={{ md: 8 }}>
          <Image
             boxSize="350px"
             src={img}
             alt="Profile Image"
             borderRadius="full"
             objectFit="cover"
             // boxShadow="0 0 20px rgba(255, 255, 255, 0.7)"
             animation={`${colorChange} 5s infinite linear`}
             boxShadow="0px 10px 15px rgba(0, 0, 0, 0.4)"
          />
        </Box>
      </Flex>
    </Center>
  );
};

export default TechReg;
