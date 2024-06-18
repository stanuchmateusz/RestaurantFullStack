import { Box, Heading, Text } from '@chakra-ui/react';
import Gallery from '../components/Gallery';
import Reviews from '../components/Reviews';

const Home = () => {
  return (
    <Box p={5}>
      <Box textAlign="center" mb={10}>
        <Heading as="h1" size="2xl" mb={4}>
          Welcome to Our Restaurant
        </Heading>
        <Text fontSize="lg" maxWidth="600px" mx="auto">
          We offer a variety of delicious dishes made from the freshest ingredients. Our cozy atmosphere and friendly staff will make you feel right at home. Come and enjoy a memorable dining experience!
        </Text>
      </Box>
      <Gallery />
      <Reviews />
    </Box>
  );
};
export default Home;
