import { Box, SimpleGrid, Image, Heading, Text } from '@chakra-ui/react';

const dishes = [
  { src: '/images/burger.jpg', alt: 'Burger', name: 'Classic Burger' },
  { src: '/images/rosol.jpg', alt: 'Rosol', name: 'Polish rosol' },
  { src: '/images/spaghetti.jpeg', alt: 'Spaghetti', name: 'Spaghetti bolognese' },
  { src: '/images/steak.jpg', alt: 'Steak', name: 'Grilled Steak' },
  { src: '/images/sushi.jpg', alt: 'Sushi', name: 'Sushi Platter' },
  { src: '/images/pizza.jpg', alt: 'Pizza', name: 'Pepperoni Pizza' },
];

const Gallery = () => {
    return (
      <Box p={5}>
        <Heading as="h2" size="xl" mb={4} textAlign="center">
          Our Best Dishes
        </Heading>
        <SimpleGrid columns={[1, 2]} spacing="40px">
          {dishes.map((dish) => (
            <Box key={dish.name} textAlign="center">
              <Box
                as="figure"
                mx="auto"
                mb={2}
                boxSize="360px"
                overflow="hidden"
                position="relative"
                borderRadius="15px"
                _hover={{
                  transform: 'scale(1.05)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  boxShadow: 'lg',
                }}
              >
                <Image
                  src={dish.src}
                  alt={dish.alt}
                  boxSize="360px"
                  objectFit="cover"
                  transition="transform 0.3s"
                  borderRadius="15px"
                  _hover={{ transform: 'scale(1.2)' }}
                />
              </Box>
              <Text fontSize="lg" fontWeight="bold">{dish.name}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    );
  };
  ;

export default Gallery;
