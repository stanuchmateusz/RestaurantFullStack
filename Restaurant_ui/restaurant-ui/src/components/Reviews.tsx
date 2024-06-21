import {
    Box,
    Button,
    Heading,
    HStack,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
    Textarea,
    VStack
} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {FaStar} from 'react-icons/fa';
import ReviewService, {Review} from "../services/ReviewService";
import {PhoneIcon} from "@chakra-ui/icons";
import {useMessage} from "../MessageContext";

const Reviews = () => {
    const defaultForm: Review = {name: '', surname: '', phoneNumber: '', message: '', rating: 5};

    const [reviews, setReviews] = useState([defaultForm]);
    const {setMessageFunc: setMessage} = useMessage();

    useEffect(
        () => {
            ReviewService.getAllReviews().then(
                (reviews) => {
                    setReviews(reviews);
                }
            );
        },
        [reviews]
    )

    const [form, setForm] = useState(defaultForm);
    const [hover, setHover] = useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleRating = (rating: number) => {
        setForm({...form, rating});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newReview: Review = {...form};
        ReviewService.addReview(newReview)
            .then(r => {
                    setReviews([...reviews, r])
                    setForm(defaultForm);
                }
            )
            .catch(e => {
                console.error(e)
                setMessage('An error occurred during review submission: ' + e.response.data);
            });

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
                                    <Icon key={i} as={FaStar} color={i < review.rating ? 'yellow.400' : 'gray.300'}/>
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
                            <InputGroup>
                                <InputLeftElement pointerEvents='none'>
                                    <PhoneIcon color='gray.300'/>
                                </InputLeftElement>
                                <Input name="phoneNumber" placeholder='Phone number' value={form.phoneNumber}
                                       onChange={handleChange} required/>
                            </InputGroup>

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
