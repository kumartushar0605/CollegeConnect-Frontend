import React, { useContext, useState, useEffect } from 'react';
import {
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Text,
  Flex,
  Spacer,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  Avatar,
  Divider,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa';
import img from "../Assests/CC.png";
import { Context } from '../index';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  HamburgerIcon,
  CloseIcon,
  SettingsIcon,
  ExternalLinkIcon,
  InfoIcon,
  PhoneIcon,
  ViewIcon,
  StarIcon
} from '@chakra-ui/icons';

const Header = () => {
  const imageSrc = img;
  const { studentt, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bg = useColorModeValue('gray.100', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const drawerBg = useColorModeValue('white', 'gray.800');
    const hoverBg = useColorModeValue('gray.100', 'gray.700');
  

  const profileSS = () => {
    navigate("/profileS");
    onClose(); // Close drawer on navigation
  };

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const studentResponse = await axios.get('https://collegeconnect-backend.onrender.com/Sme', { 
          withCredentials: true 
        });
        const student = studentResponse.data.user;
        setStudent(student);
      } catch (err) {
        console.error('Failed to fetch student data:', err);
      }
    };

    fetchStudentData();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('https://collegeconnect-backend.onrender.com/student/logout', {
        method: 'GET',
        credentials: 'include',
      });
      setIsAuthenticated(false);
      navigate('/');
      onClose(); // Close drawer on logout
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const NavigationLinks = ({ isMobile = false }) => {
    const linkProps = {
      color: textColor,
      _hover: { textDecoration: 'underline', color: 'blue.500' },
      fontWeight: '500',
      onClick: isMobile ? onClose : undefined
    };

    if (isMobile) {
      return (
        <VStack align="stretch" spacing={4}>
          <Text as={Link} to="/" {...linkProps}>
            Home
          </Text>
          <Text as={Link} to="/accept" {...linkProps}>
            Teachers
          </Text>
          <Text as={Link} to="/globals" {...linkProps}>
            Global
          </Text>
          <Text as={Link} to="/contest" {...linkProps}>
            Contest
          </Text>
          <Text as={Link} to="/about" {...linkProps}>
            About Us
          </Text>
          <Text as={Link} to="/contact" {...linkProps}>
            Contact Us
          </Text>
        </VStack>
      );
    }

    return (
      <HStack spacing={8}>
        <Text as={Link} to="/" {...linkProps}>
          Home
        </Text>
        <Text as={Link} to="/accept" {...linkProps}>
          Teachers
        </Text>
        <Text as={Link} to="/globals" {...linkProps}>
          Global
        </Text>
        <Text as={Link} to="/contest" {...linkProps}>
          Contest
        </Text>
        <Text as={Link} to="/about" {...linkProps}>
          About Us
        </Text>
        <Text as={Link} to="/contact" {...linkProps}>
          Contact Us
        </Text>
      </HStack>
    );
  };

  return (
    <>
      <Box
        bg={bg}
        borderBottom="1px"
        borderColor={borderColor}
        px={{ base: 4, md: 8 }}
        py={3}
        position="sticky"
        top={0}
        zIndex={1000}
        boxShadow="sm"
      >
        <Flex align="center" maxW="7xl" mx="auto">
          {/* Logo */}
         <HStack spacing={4} flex={1}>
                       {/* Profile Menu */}
                       <Menu>
                         <MenuButton
                           as={IconButton}
                           icon={
                             <Avatar
                               src={imageSrc}
                               size="sm"
                               name={student?.name || "User"}
                               bg="blue.500"
                             />
                           }
                           aria-label="Profile Options"
                           variant="ghost"
                           borderRadius="full"
                           _hover={{ bg: hoverBg }}
                           _active={{ bg: hoverBg }}
                         />
                         <MenuList>
                           <MenuItem onClick={profileSS} icon={<SettingsIcon />}>
                             Profile Settings
                           </MenuItem>
                           <MenuItem onClick={handleLogout} icon={<ExternalLinkIcon />} color="red.500">
                             Logout
                           </MenuItem>
                         </MenuList>
                       </Menu>
         
                       {/* College Name - Hide on mobile to save space */}
                       {student?.collegeName && (
                         <VStack align="start" spacing={0} display={{ base: 'none', sm: 'flex' }}>
                           <Text fontSize="lg" fontWeight="bold" color={textColor} noOfLines={1}>
                             {student.collegeName}
                           </Text>
                           {student.name && (
                             <Text fontSize="xs" color="gray.500" noOfLines={1}>
                               Welcome, {student.name}
                             </Text>
                           )}
                         </VStack>
                       )}
                     </HStack>
         
                     <Spacer />
         
                   
                       
                     

          <Spacer />

          {/* Desktop Navigation */}
          <Box display={{ base: "none", lg: "block" }}>
            <NavigationLinks />
          </Box>

         
         

          {/* Mobile Hamburger Menu */}
          <IconButton
            display={{ base: "flex", md: "none" }}
            icon={<FaBars />}
            variant="ghost"
            onClick={onOpen}
            aria-label="Open menu"
            _hover={{bg: 'gray.200'}}
          />
        </Flex>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay />
        <DrawerContent bg={drawerBg}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <Flex align="center">
              <Image
                src={imageSrc}
                alt="College Connect"
                boxSize="30px"
                objectFit="contain"
                mr={2}
              />
              <Text fontSize="lg" fontWeight="bold">
                Menu
              </Text>
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            <VStack align="stretch" spacing={6} mt={4}>
              {/* College Name - Mobile */}
              {student?.collegeName && (
                <>
                  <Box>
                    <Text
                      fontSize="sm"
                      color='gray.600'
                      fontWeight="500"
                      textAlign="center"
                    >
                      {student.collegeName}
                    </Text>
                  </Box>
                  <Divider />
                </>
              )}

              {/* Navigation Links */}
              <NavigationLinks isMobile={true} />

              <Divider />

              {/* Profile Section - Mobile */}
              <VStack align="stretch" spacing={3}>
                <Button
                  leftIcon={<FaUser />}
                  variant="ghost"
                  justifyContent="flex-start"
                  onClick={profileSS}
                  size="lg"
                >
                  Profile
                </Button>
                <Button
                  leftIcon={<FaSignOutAlt />}
                  variant="ghost"
                  justifyContent="flex-start"
                  onClick={handleLogout}
                  colorScheme="red"
                  size="lg"
                >
                  Logout
                </Button>
              </VStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;