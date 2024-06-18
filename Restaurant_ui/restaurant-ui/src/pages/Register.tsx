import  { useState } from 'react';
import { useMessage } from '../MessageContext';
import AuthService from '../services/AuthService';
import {
	Box,
	FormControl,
	FormLabel,
	Input,
	Button,
	Heading,
	VStack,
	FormErrorMessage,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Register = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const { message: setMessage } = useMessage();

	const [isFirstNameValid, setIsFirstNameValid] = useState(true);
	const [isLastNameValid, setIsLastNameValid] = useState(true);
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);



	const validateForm: () => boolean = () => {
		
		setIsEmailValid(validateEmail());
		setIsFirstNameValid(validateFirstName());
		setIsLastNameValid(validateLastName());
		setIsPasswordValid(validatePassword());
	
		setIsConfirmPasswordValid(validatePasswords());

		return validateFirstName() && validateLastName() && validateEmail() && validatePassword() && validatePasswords();
	}
	
	const handleRegister = async () => {

		if (!validateForm()) {
			return;
		}

		try {
			 await AuthService.register(firstName, lastName, email, password).then((response) => {
				if (response) {
				  window.location.href = '/';
				} else {
				  setMessage('Email is taken. Please try another email.');
				  setIsEmailValid(false);
				}
			  });
		} catch (error) {
			console.error(error);
			setMessage('An error occurred during registration: ' + error);
		}
	};
	function validateFirstName () :boolean {
		return firstName.length > 0;
	}

	function validateLastName():boolean  {
		return lastName.length > 0;
	}

	function validateEmail() :boolean  {
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
		return  emailRegex.test(email);
	}

	function validatePassword () : boolean  {
		return password.length > 8;
	}

	function validatePasswords() :boolean {
		return password === confirmPassword;
	}

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
					Register
				</Heading>
				<VStack spacing={4}>
					<FormControl id="first-name" isRequired isInvalid={!isFirstNameValid}>
						<FormLabel>First Name</FormLabel>
						<Input
							type="text"
							placeholder="Enter your first name"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
						<FormErrorMessage>First Name is required.</FormErrorMessage>
					</FormControl>
					<FormControl id="last-name" isRequired  isInvalid={!isLastNameValid} >
						<FormLabel>Last Name</FormLabel>
						<Input
							type="text"
							placeholder="Enter your last name"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
						<FormErrorMessage>Last Name is required.</FormErrorMessage>
					</FormControl>
					<FormControl id="email" isRequired  isInvalid={!isEmailValid}>
						<FormLabel>Email</FormLabel>
						<Input
							type="email"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						  <FormErrorMessage>Email is invalid.</FormErrorMessage>
					</FormControl>
					<FormControl id="password" isRequired isInvalid={!isPasswordValid}>
						<FormLabel>Password</FormLabel>
						<Input
							type="password"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<FormErrorMessage>Password is must be longer than 8 chars.</FormErrorMessage>
					</FormControl>
					<FormControl id="confirm-password" isRequired isInvalid={!isConfirmPasswordValid}>
						<FormLabel>Confirm Password</FormLabel>
						<Input
							type="password"
							placeholder="Confirm your password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<FormErrorMessage>Passwords must match</FormErrorMessage>
					</FormControl>
					<Button colorScheme="teal" size="lg" width="full" onClick={handleRegister}>
						Register
					</Button>
					<Link to="/login">Already have an account? Login here.</Link>
				</VStack>
			</Box>
		</Box>
	);

	
};

export default Register;
