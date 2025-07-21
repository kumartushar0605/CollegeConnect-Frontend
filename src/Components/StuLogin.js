import React, { useContext, useState } from 'react';
import { Box, Button, Center, FormControl, FormLabel, HStack, Input, Stack, Text, useColorModeValue, useBreakpointValue, Link, useToast } from '@chakra-ui/react';
import { FaGoogle, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Context } from '../index';

const MotionBox = motion(Box);

const StuLogin = () => {
  const {setIsAuthenticated}= useContext(Context)
  const formBg = useColorModeValue('white', 'gray.700');
  const buttonBg = useColorModeValue('blue.500', 'blue.200');
  const buttonHoverBg = useColorModeValue('blue.600', 'blue.300');
  const navigate = useNavigate();
  const toast = useToast(); // Initialize toast
  
  const boxWidth = useBreakpointValue({ base: '70%', md: '500px' });
  const boxHeight = useBreakpointValue({ base: 'auto', md: '600px' });

  // State to capture form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [semester, setSemester] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const sem = semester;
      const res = await fetch('https://collegeconnect-backend.onrender.com/Slogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Include credentials (cookies) in the request

        body: JSON.stringify({ name, email, semester, password })
      });

      const data = await res.json();

      if (res.status === 201) {
        toast({
          title: "Login successful.",
          description: "Welcome back!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setIsAuthenticated(true);
        navigate('/page', { state: { name, email, sem } });
      } else {
        setMessage(data.message);
        toast({
          title: "Login failed.",
          description: data.message || "Please check your credentials.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      setMessage('Login failed');
      toast({
        title: "Login failed.",
        description: "An error occurred during login. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Center minH="100vh" bg={useColorModeValue('gray.100', 'gray.800')}>
      <MotionBox 
        p={8} 
        width={boxWidth} 
        borderWidth={1} 
        borderRadius="lg" 
        height={boxHeight}
        boxShadow="lg" 
        mt={5}
        bg={formBg} 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition="0.5s"
        as="form"
        onSubmit={handleSubmit}
      >
        <Text fontSize="2xl" mb={-2} textAlign="center">Login</Text>
        <Stack spacing={4}>
          {/* Name Field */}
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input 
              type="text" 
              placeholder="Enter your name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </FormControl>

          {/* Email Field */}
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </FormControl>

          {/* Semester Field */}
          <FormControl id="semester" isRequired>
            <FormLabel>Semester</FormLabel>
            <Input 
              type="text" 
              placeholder="Enter your semester" 
              value={semester} 
              onChange={(e) => setSemester(e.target.value)} 
            />
          </FormControl>

          {/* Password Field */}
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input 
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </FormControl>

          {/* Login Button */}
          <Button 
            bg={buttonBg} 
            color="white" 
            size="lg" 
            mt={2} 
            _hover={{ bg: buttonHoverBg }}
            transition="0.3s"
            type="submit"
          >
            Login
          </Button>

         

          {/* Error Message Display */}
          {message && <Text color="red.500" mt={2}>{message}</Text>}

          {/* Redirect to Register */}
          <Text textAlign="center" mt={6}>
            New user? <Link color="blue.500" onClick={() => navigate('/res')}>Register</Link>
          </Text>
        </Stack>
      </MotionBox>
    </Center>
  );
};

export default StuLogin;
