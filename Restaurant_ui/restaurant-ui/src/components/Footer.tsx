import { Box, Flex, Text, Link, Icon, HStack, VStack } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <Box className='element' py={4} mt={10}>
            <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center" maxW="1200px" mx="auto" px={4}>
                <VStack spacing={1} align="flex-start">
                    <Text fontSize="lg" fontWeight="bold">RESTaurant</Text>
                    <Text>123 Main Street</Text>
                    <Text>New York, NY 10001</Text>
                    <Text>(123) 456-7890</Text>
                </VStack>
                <VStack spacing={1} align="flex-start" mt={{ base: 4, md: 0 }}>
                    <Text fontSize="lg" fontWeight="bold">Connect with Us</Text>
                    <HStack spacing={4}>
                        <Link href="#" isExternal aria-label="Facebook">
                            <Icon as={FaFacebook} boxSize={6} />
                        </Link>
                        <Link href="#" isExternal aria-label="Twitter">
                            <Icon as={FaTwitter} boxSize={6} />
                        </Link>
                        <Link href="#" isExternal aria-label="Instagram">
                            <Icon as={FaInstagram} boxSize={6} />
                        </Link>
                    </HStack>
                </VStack>
            </Flex>
            <Text textAlign="center" mt={4}>&copy; {new Date().getFullYear()} RESTaurant. All rights reserved.</Text>
        </Box>
    );
};

export default Footer;