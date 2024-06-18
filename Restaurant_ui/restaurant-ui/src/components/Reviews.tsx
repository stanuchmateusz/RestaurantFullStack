import { Box, VStack, Heading, Text, Input, Textarea, Button, HStack, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Reviews = () => {
  const [reviews, setReviews] = useState([ //todo fetch from the server
    { name: 'John', surname: 'Doe', phone:'', message: 'Great food!', rating: 5 },
    { name: 'Jane', surname: 'Smith',phone:'', message: 'Lovely ambiance.', rating: 4 },
    { name: 'Alice', surname: 'Brown', phone:'', message: 'Friendly staff.', rating: 5 },
  ]);

  const defaultForm = { name: '', surname: '',phone:'', message: '', rating: 5 };

  const [form, setForm] = useState(defaultForm);
  const [hover, setHover] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRating = (rating: number) => {
    setForm({ ...form, rating });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //todo send it to the server
    console.log(form);
    setReviews([...reviews, form]);
    setForm(defaultForm);
  };

  return (
    <Box p={5}>
      <Heading as="h2" size="xl" mb={4} textAlign="center">
        Reviews
      </Heading>
      <VStack spacing={4} align="stretch">
        {reviews.map((review, index) => (
          <Box key={index} p={4} borderWidth="1px" borderRadius="lg" shadow="md">
            <HStack spacing={2}>
              {Array(5)
                .fill('')
                .map((_, i) => (
                  <Icon key={i} as={FaStar} color={i < review.rating ? 'yellow.400' : 'gray.300'} />
                ))}
            </HStack>
            <Text fontSize="lg" fontWeight="bold">
              {review.name} {review.surname}
            </Text>
            <Text>{review.message}</Text>
          </Box>
        ))}
      </VStack>
      <Box mt={8}>
        <Heading as="h3" size="lg" mb={4}>
          Add Your Review
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <HStack spacing={4} width="100%">
              <Input
                placeholder="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <Input
                placeholder="Surname"
                name="surname"
                value={form.surname}
                onChange={handleChange}
                required
              />
              <Input
                placeholder="Phone number"
                name="phone"
                type='tel'  
                value={form.phone}
                onChange={handleChange}
                required
              />
            </HStack>
            <Textarea
              placeholder="Message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
            />
            <HStack spacing={2}>
              {Array(5)
                .fill('')
                .map((_, i) => (
                  <Icon
                    key={i}
                    as={FaStar}
                    color={i < (hover || form.rating) ? 'yellow.400' : 'gray.300'}
                    onMouseEnter={() => setHover(i + 1)}
                    onMouseLeave={() => setHover(form.rating)}
                    onClick={() => handleRating(i + 1)}
                    cursor="pointer"
                  />
                ))}
            </HStack>
            <Button type="submit" colorScheme="teal">
              Submit Review
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Reviews;
