import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Avatar, Text, useBreakpointValue, useDisclosure, useToast, useColorModeValue, Stack, HStack, Center, IconButton, Spinner } from '@chakra-ui/react';
import {  FaComment,FaArrowRight, FaRedo } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { Context } from '../index';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Chatwindow from './Chatwindow';

const DoubtBox = ({ name, email, semester, price, doubt, _id, readyId ,Semail}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const { studentt } = useContext(Context);
  const [buttonClicked, setButtonClicked] = useState(false);
  const boxBg = useColorModeValue('white', 'gray.700');
  const headingColor = useColorModeValue('blue.500', 'blue.300');
  const [Tname, setTeacherName] = useState("");
  const [account, setAccount] = useState("");
  const [payment, setPayment] = useState("");
  const [sec, setSec] = useState("");
  const [teacherID, setTeacherID] = useState("");
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);  // New loading state

  useEffect(() => {
    fetchTeacher();
  
  }, []);

 

  const updateHandler = async () => {
    try {
      setButtonClicked(true);
      await fetch(`https://collegeconnect-backend.onrender.com/status/${Semail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, _id }),
       
      });
     
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTeacher = async () => {
    try {
      const response = await fetch(`https://collegeconnect-backend.onrender.com/address/${email}`);
      const result = await response.json();
      setAccount(result.account);
      setPayment(result.payment);
      setSec(result.secretCode);
      setTeacherID(result._id);
      setTeacherName(result.name);
    } catch (error) {
      console.log(error);
    }
  };


  const deletee = async () => {
    try {
      setButtonClicked(true);
      await fetch(`https://collegeconnect-backend.onrender.com/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, _id, readyId }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const buyHandler = async () => {
  //   const signer = await provider.getSigner();
  //     const transaction = await collegeConnectt.connect(signer).sendEther(addresss, { value: tokens(ether) });
  //     await transaction.wait(); 
  //     updatePayment();
  //     await fetchTeacher(); 
  //   setIsLoading(true);  // Start loading animation
   
  // };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchTeacher(); // Re-fetch data every 5 seconds
    }, 3000);
  
    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []); // Empty dependency array ensures it runs only once on mount
  useEffect(() => {
    if (sec && sec !== "L" && sec !=="") {
      // If `sec` is now populated, stop the loading animation and proceed
      setIsLoading(false);
      deletee();
      navigate("/meet", { state: { sec } });
    }else if(payment==="YES"){
      setIsLoading(true);
    }
  }, [sec]);

  const buyHandler2 = () => {
    navigate("/checkout", { state: { name, sec, email, _id, readyId,account,price } });
  };

  // const updatePayment = async () => {
  //   try {
  //     await fetch(`http://localhost:5000/pay/${email}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Box
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="md"
      bg={boxBg}
      width={useBreakpointValue({ base: '90%', sm: '400px' })}
      mb={4}
      position="relative"
    >
      <HStack spacing={4}>
        <Avatar name={name} src={`https://api.adorable.io/avatars/150/${email}.png`} />
        <Stack spacing={1}>
          <Text fontSize="xl" fontWeight="bold" color={headingColor}>{name}</Text>
          <Text fontSize="md" color="gray.600">Email: {email}</Text>
          <Text fontSize="md" color="gray.600">Semester: {semester}</Text>
          <Text fontSize="md" color="gray.600">Your doubt: {doubt}</Text>
          <Text fontSize="md" color="gray.600">Rating: <strong>1</strong></Text>
          <Text fontSize="md" fontWeight="bold" color="teal.500">
            Rate:{price > 0 ? `₹${price}` : ''}
          </Text>
        </Stack>
      </HStack>
      <HStack spacing={4} mt={4} justify="center">
        <Button onClick={onOpen} leftIcon={<FaComment />} colorScheme="blue" variant="outline" size="sm">
          Chat
        </Button>
        {!buttonClicked && (
          <Button
            onClick={updateHandler}
            rightIcon={<FaArrowRight />}
            colorScheme="purple"
            variant="outline"
            size="sm"
          >
            Continue
          </Button>
        )}
      </HStack>
      {isOpen && <Chatwindow name={Tname} onClose={onClose} />}
      {buttonClicked && (
        <HStack spacing={4} mt={4} justify="center">
          {price > 0 && (
            <Button onClick={buyHandler2} colorScheme="orange" variant="outline" size="sm">
              Pay via INR
            </Button>
          )}
        </HStack>
      )}

      {/* Loading Animation Box */}
      {isLoading && (
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0, 0, 0, 0.6)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="1"
          borderRadius="lg"
        >
          <Center>
            <Spinner size="xl" color="blue.500" />
            <Text ml={3} fontSize="lg" color="white">Wait for a while...</Text>
          </Center>
        </Box>
      )}
    </Box>
  );
};


// App component
const Accept = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { email } = location.state || {};
      const [student, setStudent] = useState(null);
  
  useEffect(() => {
      const fetchStudentData = async () => {
        try {
         const studentResponse = await axios.get('https://collegeconnect-backend.onrender.com/Sme', { withCredentials: true });
               const student = studentResponse.data.user;
          setStudent(student);
        } catch (err) {
           
        }
      };
  
      fetchStudentData();
    }, []);

  const emaill = student?.email;
  
  useEffect(() => {
    // Fetching data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch('https://collegeconnect-backend.onrender.com/data', {
  credentials: "include", // <--- THIS is mandatory
});
 // Adjust the URL to your backend
        const result = await response.json();
        console.log(result);
        console.log("checkingg")
       

        const filterData = result.filter((teacher) => teacher.Semail === emaill);
        console.log(filterData + "hiii");
        setData(filterData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [email, emaill]);

  return (
    <Center minH="100vh" bg={useColorModeValue('gray.100', 'gray.800')} position="relative">
      <IconButton
        icon={<FaRedo />}
        colorScheme="blue"
        variant="solid"
        size="lg"
        position="absolute"
        top={4}
        right={4}
        boxShadow="lg"
        onClick={() => window.location.reload()}
        aria-label="Refresh page"
        borderRadius="full"
        _hover={{ bg: useColorModeValue('blue.600', 'blue.400') }}
        _active={{ bg: useColorModeValue('blue.700', 'blue.500') }}
      />
      <Stack spacing={6} p={6} maxWidth="1200px" width="full">
        <Text fontSize="3xl" fontWeight="bold" textAlign="center">
          Welcome to the Doubts Clearing Platform
        </Text>
        <Text fontSize="lg" textAlign="center" color="gray.600">
          Here you can get in touch with experts to resolve your queries quickly and efficiently.
        </Text>
                <Text fontSize="sm" textAlign="center" color="gray.600">Refresh the page periodically to check for new updates.</Text>
        
        {loading ? (
          <Text fontSize="lg" textAlign="center" color="gray.600">
            Waiting for response...
          </Text>
        ) : data.length === 0 ? (
          <Text fontSize="lg" textAlign="center" color="gray.600">
            Waiting for the response....
          </Text>
        ) : (
          <HStack spacing={4} wrap="wrap" justify="center">
            {data.map((item, index) => (
              <DoubtBox 
                key={index} 
                name={item.name} 
                email={item.email} 
                semester={item.semester} 
                price={item.price}
                doubt={item.doubt}
                _id={item._idS}
                readyId={item._id}
                Semail={item.Semail}
              />
            ))}
          </HStack>
        )}
      </Stack>
    </Center>
  );
};

export default Accept;
