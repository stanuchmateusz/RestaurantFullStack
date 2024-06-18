import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
    textAlign="center"
    p={4}
  >
    <Box>
      <Heading as="h1" size="2xl" mb={4}>
        404
      </Heading>
      <Text fontSize="xl" mb={6}>
        Page Not Found
      </Text>
      <Button as={Link} to="/" colorScheme="teal" size="lg">
        Go to Homepage
      </Button>
    </Box>
  </Box>
  );
};
export default Page404;