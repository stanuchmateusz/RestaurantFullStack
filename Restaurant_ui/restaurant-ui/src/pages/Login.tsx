import {useState} from 'react';
import {useMessage} from '../MessageContext';
import AuthService from '../services/AuthService';
import {Box, Button, FormControl, FormLabel, Heading, Input, VStack,} from '@chakra-ui/react';
import {Link} from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setMessageFunc: setMessage} = useMessage();
    const [isFormValid, setIsFormValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const validateForm = () => {
        setIsEmailValid(email.length > 0);
        setIsPasswordValid(password.length > 0);
        setIsFormValid(isEmailValid && isPasswordValid);
    }

    const handleLogin = async () => {
        try {
            validateForm();
            if (!isFormValid) {
                setMessage('Please fill in all fields');
                return;
            }
            await AuthService.login(email, password).then((response) => {
                if (response) {
                    window.location.href = '/';
                } else {
                    setMessage('Invalid credentials');
                }
            });
        } catch (error) {
            setMessage('An error occurred during login: ' + error);
        }
    };
    return (
        <Box
            display="flex"
            justifyContent="center"
            margin="100px"
        >
            <Box
                p={16}
                maxW="lg"
                borderWidth={1}
                borderRadius="lg"
                boxShadow="lg"
            >
                <Heading as="h2" mb={6} textAlign="center" size="lg">
                    Login
                </Heading>
                <VStack spacing={4}>
                    <FormControl id="email">
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            isInvalid={!isEmailValid}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            isInvalid={!isPasswordValid}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                    <Button colorScheme="teal" size="lg" width="full" onClick={handleLogin}>
                        Login
                    </Button>
                    <p>Don't have an account? <br/>
                        <Link to="/register">Register here.</Link></p>
                </VStack>
            </Box>
        </Box>
    );
};

export default Login;
