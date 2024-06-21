import {Box, Flex, Heading, useColorModeValue} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../services/AuthService';
import {MessageType, useMessage} from '../MessageContext';

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());
    const {setMessageFunc: setMessage} = useMessage();

    useEffect(() => {
        setIsAuthenticated(AuthService.isAuthenticated());
    }, []);
    return (
        <Box bg="brand.500" px={4}
             className='element'
             shadow={useColorModeValue('md', 'dark-lg')}
        >
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <Heading size="md">RESTaurtant</Heading>
                <Flex justifyContent="space-between">
                    <Box mr={4}>
                        <Link to="/">Home</Link>
                    </Box>
                    {!isAuthenticated ? (
                        <>
                            <Box mr={4}>
                                <Link to="/login">Login</Link>
                            </Box>
                            <Box mr={4}>
                                <Link to="/register">Register</Link>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Box mr={4}>
                                <Link to="" onClick={
                                    () => {
                                        AuthService.logout();
                                        setIsAuthenticated(false);
                                        setMessage('Signed out successfully', MessageType.SUCCESS);
                                    }
                                }>Logout</Link>
                            </Box>
                        </>
                    )
                    }
                    <Box mr={4}>
                        <Link to="/contact">Contact</Link>
                    </Box>

                </Flex>
            </Flex>
        </Box>
    );
};

export default Navbar;