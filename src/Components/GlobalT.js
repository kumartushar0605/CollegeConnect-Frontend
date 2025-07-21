import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Center, Text, VStack, useDisclosure,Spinner, Image, HStack, IconButton } from '@chakra-ui/react';
import { FaRedo,FaComment} from 'react-icons/fa';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import img from "../Assests/avatar-2092113.svg";
import { Context } from '../index';
import Chatwindow from './Chatwindow';

// Actual API function
const fetchTeacherData = async () => {
  const teacherResponse = await axios.get('https://collegeconnect-backend.onrender.com/Tme', { 
    withCredentials: true 
  });
  return teacherResponse.data;
};

const GlobalT = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const location = useLocation();
  const { sem, email } = location.state || {};

  const [status, setStatus] = useState('Offline');
  const [students, setStudents] = useState([]);
  const [my, setMy] = useState([]);
  const [loading, setLoading] = useState(false);
    const [student, setStudent] = useState(null);
  

    useEffect(() => {
      const loadStudentData = async () => {
        try {
          setLoading(true);
          const studentResponse = await fetchTeacherData();
          const student = studentResponse.user;
          setStudent(student);
          
        } catch (err) {
           console.log(err);
          }
      };
  
      loadStudentData();
    }, []);

  const get = async () => {
    try {
      const response = await axios.get(`https://collegeconnect-backend.onrender.com/get/${student.email}`);
      setMy(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const emaill = student.email;
      const semester = student.semester;
      const response = await axios.get('https://collegeconnect-backend.onrender.com/doubtss');

      const filteredStudents = response.data.filter(
        (student) => student.semester <= semester && student.Temail === emaill && student.global === "YES"
      );
      const emptyTemailStudents = response.data.filter(
        (student) => student.Temail === '' && student.semester <= semester && student.global === "YES"
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

  const handleStudentSelection = async (Semail, doubt,_id) => {
    const { name, email, semester, price } = my;
    try {
      await fetch('https://collegeconnect-backend.onrender.com/sendd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, semester, Semail, price, doubt,_id }),
      });

      // Immediately refetch the data after the response
      fetchStudents();
    } catch (error) {
      console.log(error);
    }
  };

  const continuee = () => {
    const emaill = student.email;
    navigate("/payStatus", { state: { emaill } });
  };

  // Function to refresh the page
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <Center minH="100vh" bg="teal.900" p={4}>
      <VStack spacing={6} w="full">
        <HStack justifyContent="space-between" w="full" maxW="600px">
          <Text fontSize="xl" color="gray.300" textAlign="center">
            Here you can see students who have raised doubts globally. Select a student to assist them.
             
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
                        onClick={() => handleStudentSelection(student.email, student.doubt,student._id)}
                      >
                        Continue
                      </Button>
                    )}
                  </Box>
                  <Button onClick={onOpen}  leftIcon={<FaComment />} colorScheme="blue" variant="outline" transform="translate(170px,-60px)"size="sm">
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

export default GlobalT;
