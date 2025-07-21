import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Image,
  VStack,
  HStack,
  keyframes
} from '@chakra-ui/react';
import img from "../Assests/CC.png"


const ContactUs = () => {
    const colorChange = keyframes`
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
`;
  return (
    <>
  <HStack gap={40}>
 
  <Box bg="gray.800" color="white" minH="100vh" ml={180} mt={-9} py={10}>
      <Container maxW="md">
        <HStack spacing={4} align="center" justify="space-between" mb={3}>
          <VStack spacing={6} align="flex-start">
            <Heading as="h1" textAlign="left">
              Contact Us
            </Heading>
            <Text textAlign="left" fontSize="lg">
              We would love to hear from you! Fill out the form below to get in touch.
            </Text>
          </VStack>
         
        </HStack>
        <Box bg="gray.700" p={8} borderRadius="md">
          <VStack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input placeholder="Your Name" bg="gray.600" border="none" focusBorderColor="teal.400" />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Your Email" bg="gray.600" border="none" focusBorderColor="teal.400" />
            </FormControl>
            <FormControl id="message" isRequired>
              <FormLabel>Message</FormLabel>
              <Textarea placeholder="Your Message" bg="gray.600" border="none" focusBorderColor="teal.400" />
            </FormControl>
            <Button colorScheme="teal" w="full" mt={4}>
              Send Message
            </Button>
          </VStack>
        </Box>
      </Container>
    </Box>
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
  </HStack>
    </>
  );
};

export default ContactUs;
