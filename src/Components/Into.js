import React, { useContext, useState } from 'react';
import { Box, Button, Text, VStack, HStack, ScaleFade, keyframes, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Context } from '../index';
import { Typewriter } from 'react-simple-typewriter';
import img from '../Assests/CC.png';

// Define keyframe animations
const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(-20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const buttonGlow = keyframes`
  0%, 100% { box-shadow: 0 0 10px #ff007f; }
  50% { box-shadow: 0 0 20px #ff007f, 0 0 30px #ff007f; }
`;

const colorChange = keyframes`
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
`;

const Intro = () => {
  const { isAuthenticated, TeIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);
  const [showLearnerOptions, setShowLearnerOptions] = useState(false);

  const handleGetStarted = () => {
    setShowButtons(true);
  };

  const teacher = () => {
    const tea = "teacher";
    if (TeIsAuthenticated) {
      navigate('/home2');
    } else {
      navigate('/ress', { state: { tea } });
    }
  };

  const handleLearner = () => {
    setShowLearnerOptions(true);
  };

  const collegeStudent = () => {
    const stu = "college_student";
    if (isAuthenticated) {
      navigate('/home');
    } else {
      navigate('/res', { state: { stu } });
    }
  };

  const schoolStudent = () => {
   navigate("/subs")
  };

  return (
    <Box
      w="100vw"
      h="100vh"
      bgGradient="linear(to-b, #1A202C, #2D3748)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      color="white"
      textAlign="center"
      p={6}
      as={motion.div}
      animation={`${fadeIn} 1s ease-in-out`}
    >
      <HStack
        spacing={12}
        align="center"
        p={8}
        height={400}
        width={10000}
        bg="rgba(26, 32, 44, 0.9)"
        borderRadius="lg"
        boxShadow="2xl"
        backdropFilter="blur(10px)"
      >
        <VStack spacing={6} align="center">
          <Text
            fontSize="5xl"
            fontWeight="extrabold"
            bgGradient="linear(to-l, #FF0080, #7928CA)"
            bgClip="text"
            lineHeight="shorter"
          >
            Welcome to the CollegeConnect
          </Text>

          <Text fontSize="lg" fontWeight="medium" letterSpacing="wider">
            <Typewriter
              words={['A space to connect, learn, and grow together.']}
              loop={Infinity}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </Text>

          {!showButtons && (
            <Button
              colorScheme="yellow"
              size="lg"
              variant="solid"
              onClick={handleGetStarted}
              transition="all 0.3s ease-in-out"
              _hover={{ transform: 'scale(1.1)', bg: 'yellow.400' }}
              _active={{ transform: 'scale(0.9)' }}
              animation={`${buttonGlow} 1.5s infinite`}
              boxShadow="0 0 20px rgba(255, 255, 0, 0.7)"
            >
              Get Started
            </Button>
          )}

          {showButtons && !showLearnerOptions && (
            <ScaleFade initialScale={0.9} in={showButtons}>
              <VStack spacing={4}>
                <Button
                  colorScheme="blue"
                  size="lg"
                  variant="solid"
                  width="220px"
                  transition="all 0.3s ease"
                  _hover={{ bg: 'blue.600', color: 'white' }}
                  as={motion.div}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLearner}
                  boxShadow="0 0 20px rgba(0, 0, 255, 0.7)"
                >
                  Learner
                </Button>
                <Button
                  colorScheme="pink"
                  size="lg"
                  variant="solid"
                  width="220px"
                  transition="all 0.3s ease"
                  _hover={{ bg: 'pink.600', color: 'white' }}
                  as={motion.div}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={teacher}
                  boxShadow="0 0 20px rgba(255, 105, 180, 0.7)"
                >
                  Freelancing Tutor 
                </Button>
              </VStack>
            </ScaleFade>
          )}

          {showLearnerOptions && (
            <ScaleFade initialScale={0.9} in={showLearnerOptions}>
              <VStack spacing={4}>
                <Button
                  colorScheme="green"
                  size="lg"
                  variant="solid"
                  width="220px"
                  transition="all 0.3s ease"
                  _hover={{ bg: 'green.600', color: 'white' }}
                  as={motion.div}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={collegeStudent}
                  boxShadow="0 0 20px rgba(0, 255, 0, 0.7)"
                >
                  College Student
                </Button>
               
              </VStack>
            </ScaleFade>
          )}
        </VStack>

        {/* Image on the right with color changing animation */}
        <Image
          src={img}
          boxSize="250px"
          borderRadius="full"
          ml={20}
          boxShadow="0 0 20px rgba(255, 255, 255, 0.7)"
          animation={`${colorChange} 5s infinite linear`}
        />
      </HStack>
    </Box>
  );
};

export default Intro;
