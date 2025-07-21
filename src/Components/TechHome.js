import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Center, Text,IconButton, VStack,useDisclosure, Spinner, Image, HStack } from '@chakra-ui/react';
import axios from 'axios';
import { FaPhone, FaComment, FaArrowRight, FaRedo } from 'react-icons/fa';

import { useLocation,useNavigate } from 'react-router-dom';
import img from "../Assests/avatar-2092113.svg";
import { Context } from '../index';
import Chatwindow from './Chatwindow';




const TechHome = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const location = useLocation();
  const { sem, email } = location.state || {};
  const { teacherr } = useContext(Context);

  const [status, setStatus] = useState('Offline');
  const [students, setStudents] = useState([]);
  const [my, setMy] = useState([]);
  const [loading, setLoading] = useState(false);
  const refreshPage = () => {
    window.location.reload();
  };
  const get = async () => {
    const emaill = teacherr.email;
    try {
      const response = await axios.get(`https://collegeconnect-backend.onrender.com/get/${emaill}`);
      setMy(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const emaill = teacherr.email;
      const semester = teacherr.semester;
      const response = await axios.get('https://collegeconnect-backend.onrender.com/doubtss');

      const filteredStudents = response.data.filter(
        (student) => student.semester <= semester && student.Temail === emaill && student.global ==="NO"
      );
      const emptyTemailStudents = response.data.filter(
        (student) => student.Temail === '' && student.semester <= semester && student.global === "NO"
      );

      const finalStudents = [...filteredStudents, ...emptyTemailStudents];
      setStudents(finalStudents);

      console.log(emaill);
      console.log('Fetched students');
    } catch (error) {
      console.error('Error fetching student data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    get();

    if (status === 'Online') {
      fetchStudents();

      // Polling: Fetch students every 10 seconds to check for updated responses
      const interval = setInterval(fetchStudents, 10000);

      // Cleanup interval on component unmount or when status changes
      return () => clearInterval(interval);
    }
  }, [status, sem]);

  const handleToggleStatus = () => {
    if (status === 'Offline') {
      setStatus('Online');
    } else {
      setStatus('Offline');
      setStudents([]);
    }
  };

  const handleStudentSelection = async (Semail,doubt,_id) => {
    const { name, email, semester, price } = my;
    try {
      await fetch('https://collegeconnect-backend.onrender.com/sendd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, semester, Semail, price,doubt,_id }),
      });

      // Immediately refetch the data after the response
      fetchStudents();
    } catch (error) {
      console.log(error);
    }

    // try {
    //   await fetch(`http://localhost:5000/up/${Semail}`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const continuee = ()=>{
    const emaill = teacherr.email;
    navigate("/payStatus",{state:{emaill}})
  }
  return (
    <Center minH="90vh" bg="teal.900" p={4}>
      <VStack spacing={6} w="full">
        <Text fontSize="3xl" color="white" textAlign="center">
          Welcome to the TechHome Dashboard
        </Text>
  <HStack justifyContent="space-between" w="full" maxW="600px">
          <Text fontSize="xl" color="gray.300" textAlign="center">
          Here you can see students who have raised doubts. Select a student to assist them.
        
         </Text>
          <IconButton
            aria-label="Refresh Page"
            icon={<FaRedo />}
            onClick={refreshPage}
            colorScheme="teal"
            variant="outline"
          />
        </HStack>
                <Text>Refresh the page periodically to check for newly raised doubts.</Text>
        
        <Button onClick={handleToggleStatus} colorScheme={status === 'Offline' ? 'red' : 'green'}>
          {status === 'Offline' ? 'Go Online' : 'Go Offline'}
        </Button>

        {status === 'Online' && loading && <Spinner color="white" />}

        {status === 'Online' && !loading && students.length > 0 && (
          <Box w="full" maxW="600px">
            <Text fontSize="2xl" mb={4} color="white">Students with Doubts:</Text>
            {students.map((student) => (
              <Box
                key={student._id}
                p={4}
                bg="teal.700"
                mb={4}
                borderWidth="1px"
                borderRadius="lg"
              >
                <HStack spacing={4}>
                  <Image
                    src={img}
                    boxSize="50px"
                    borderRadius="full"
                  />
                  <Box>
                    <Text fontSize="lg" fontWeight="bold" color="white">{student.name}</Text>
                    <Text fontStyle="italic" color="gray.300">Semester: {student.semester}</Text>
                    <Text fontStyle="italic" color="gray.300">Subject: {student.subject} | Chapter: {student.chapter}</Text>
                    <Text color="blue.300" mt={2}>{student.doubt}</Text>

                    {student.reesponse === 'pending' ? (
                      <Text color="yellow.300">Status: Awaiting Response...</Text>
                    ) : student.reesponse === 'accepted' ? (
                      <Button colorScheme="blue" mt={2} onClick={continuee}>
                        Ready for the Session
                      </Button>
                    ) : (
                      <Button
                        colorScheme="purple"
                        mt={2}
                        onClick={() => handleStudentSelection(student.email,student.doubt,student._id)}
                      >
                        Continue
                      </Button>
                    )}
                  </Box>
                  <Button onClick={onOpen}  leftIcon={<FaComment />} colorScheme="blue" variant="outline"   transform="translate(180px,-60px)" // Added 'px' unit
 size="sm">
          Chat

        </Button>
      {isOpen && <Chatwindow name={student.name} onClose={onClose} />}

                </HStack>
              </Box>
            ))}
          </Box>
        )}

        {status === 'Online' && !loading && students.length === 0 && (
          <Text color="white">No students with doubts.</Text>
        )}
      </VStack>
    </Center>
  );
};

export default TechHome;
