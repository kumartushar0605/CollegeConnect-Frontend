import React, { useContext, useState } from 'react';
import { 
  Box, 
  Button, 
  Text, 
  VStack, 
  HStack, 
  ScaleFade, 
  keyframes, 
  Image, 
  Stack,
  Container,
  useBreakpointValue,
  Flex
} from '@chakra-ui/react';
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

const bounceIn = keyframes`
  0% { transform: scale(0.3) translateY(-50px); opacity: 0; }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1) translateY(0); opacity: 1; }
`;

const slideUp = keyframes`
  0% { transform: translateY(50px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

const Intro = () => {
  const { isAuthenticated, TeIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);
  const [showLearnerOptions, setShowLearnerOptions] = useState(false);

  // Responsive values
  const titleSize = useBreakpointValue({ base: '3xl', md: '4xl', lg: '5xl' });
  const containerWidth = useBreakpointValue({ base: '95%', md: '90%', lg: 'auto' });
  const containerHeight = useBreakpointValue({ base: 'auto', md: '400px' });
  const imageSize = useBreakpointValue({ base: '150px', md: '200px', lg: '250px' });
  const spacing = useBreakpointValue({ base: 6, md: 8, lg: 12 });
  const containerPadding = useBreakpointValue({ base: 4, md: 6, lg: 8 });
  const buttonWidth = useBreakpointValue({ base: '200px', md: '220px' });

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
    navigate("/subs");
  };

  return (
    <Box
      w="100vw"
      minH="100vh"
      bgGradient="linear(to-b, #1A202C, #2D3748)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      color="white"
      textAlign="center"
      p={{ base: 4, md: 6 }}
      animation={`${fadeIn} 1s ease-in-out`}
    >
      <Container maxW="7xl" centerContent>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          spacing={spacing}
          align="center"
          justify="center"
          p={containerPadding}
          minH={containerHeight}
          w={containerWidth}
          bg="rgba(26, 32, 44, 0.9)"
          borderRadius="lg"
          boxShadow="2xl"
          backdropFilter="blur(10px)"
          border="1px solid"
          borderColor="whiteAlpha.200"
        >
          {/* Text and Buttons Section */}
          <VStack 
            spacing={6} 
            align="center" 
            flex={1}
            maxW={{ base: "100%", lg: "500px" }}
          >
            <Text
              fontSize={titleSize}
              fontWeight="extrabold"
              bgGradient="linear(to-l, #FF0080, #7928CA)"
              bgClip="text"
              lineHeight="shorter"
              animation={`${bounceIn} 1.2s ease-out`}
              textAlign="center"
            >
              Welcome to CollegeConnect
            </Text>

            <Box
              fontSize={{ base: 'md', md: 'lg' }}
              fontWeight="medium"
              letterSpacing="wider"
              animation={`${slideUp} 1.5s ease-out`}
              minH="60px"
              display="flex"
              alignItems="center"
              textAlign="center"
            >
              <Typewriter
                words={['A space to connect, learn, and grow together.']}
                loop={Infinity}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </Box>

            {!showButtons && (
              <Button
                colorScheme="yellow"
                size={{ base: 'md', md: 'lg' }}
                variant="solid"
                onClick={handleGetStarted}
                transition="all 0.3s ease-in-out"
                _hover={{ 
                  transform: 'scale(1.1)', 
                  bg: 'yellow.400',
                  boxShadow: '0 0 30px rgba(255, 255, 0, 0.8)'
                }}
                _active={{ transform: 'scale(0.9)' }}
                animation={`${buttonGlow} 1.5s infinite`}
                boxShadow="0 0 20px rgba(255, 255, 0, 0.7)"
                px={8}
              >
                Get Started
              </Button>
            )}

            {showButtons && !showLearnerOptions && (
              <ScaleFade initialScale={0.9} in={showButtons}>
                <VStack spacing={4}>
                  <Button
                    colorScheme="blue"
                    size={{ base: 'md', md: 'lg' }}
                    variant="solid"
                    width={buttonWidth}
                    transition="all 0.3s ease"
                    _hover={{ 
                      bg: 'blue.600', 
                      color: 'white',
                      transform: 'scale(1.05)',
                      boxShadow: '0 0 25px rgba(0, 0, 255, 0.8)'
                    }}
                    _active={{ transform: 'scale(0.95)' }}
                    onClick={handleLearner}
                    boxShadow="0 0 20px rgba(0, 0, 255, 0.7)"
                  >
                    Learner
                  </Button>
                  <Button
                    colorScheme="pink"
                    size={{ base: 'md', md: 'lg' }}
                    variant="solid"
                    width={buttonWidth}
                    transition="all 0.3s ease"
                    _hover={{ 
                      bg: 'pink.600', 
                      color: 'white',
                      transform: 'scale(1.05)',
                      boxShadow: '0 0 25px rgba(255, 105, 180, 0.8)'
                    }}
                    _active={{ transform: 'scale(0.95)' }}
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
                    size={{ base: 'md', md: 'lg' }}
                    variant="solid"
                    width={buttonWidth}
                    transition="all 0.3s ease"
                    _hover={{ 
                      bg: 'green.600', 
                      color: 'white',
                      transform: 'scale(1.05)',
                      boxShadow: '0 0 25px rgba(0, 255, 0, 0.8)'
                    }}
                    _active={{ transform: 'scale(0.95)' }}
                    onClick={collegeStudent}
                    boxShadow="0 0 20px rgba(0, 255, 0, 0.7)"
                  >
                    College Student
                  </Button>
                  
                  {/* Back Button for mobile */}
                  <Button
                    variant="ghost"
                    size={{ base: 'sm', md: 'md' }}
                    onClick={() => setShowLearnerOptions(false)}
                    color="whiteAlpha.700"
                    _hover={{ color: 'white', bg: 'whiteAlpha.200' }}
                    display={{ base: 'block', lg: 'none' }}
                  >
                    ← Back
                  </Button>
                </VStack>
              </ScaleFade>
            )}
          </VStack>

          {/* Image Section */}
          <Flex
            justify="center"
            align="center"
            flex={{ base: 'none', lg: 1 }}
            mt={{ base: 6, lg: 0 }}
          >
            <Image
              src={img}
              boxSize={imageSize}
              borderRadius="full"
              boxShadow="0 0 20px rgba(255, 255, 255, 0.7)"
              animation={`${colorChange} 5s infinite linear`}
              transition="all 0.3s ease"
              _hover={{
                transform: 'scale(1.05)',
                boxShadow: '0 0 30px rgba(255, 255, 255, 0.9)'
              }}
            />
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
};

export default Intro;