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
import {MessageType, useMessage} from "../MessageContext";
import AuthService from "../services/AuthService";
import {DeleteIcon} from "@chakra-ui/icons";


const Reviews = () => {
    const defaultForm: Review = {name: '', surname: '', phoneNumber: '', message: '', rating: 5};
    const isModerator = AuthService.hasModeratorPermission();
    const [reviews, setReviews] = useState([defaultForm]);
    const {setMessageFunc: setMessage} = useMessage();
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
    const [hover, setHover] = useState(0);
    const [form, setForm] = useState(defaultForm);

    useEffect(
        () => loadReviews(),
        []
    )

    function loadReviews() {

        ReviewService.getAllReviews()
            .then(
                (reviews) => {
                    setReviews(reviews);
                }
            ).catch(e =>
            console.error(e)
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleRating = (rating: number) => {
        setForm({...form, rating});
    };

    function deleteReview(index: number) {
        const review = reviews[index];
        if (!review) {
            console.error('Review not found');
            return;
        }
        ReviewService.deleteReview(review.phoneNumber).then(r => {
            if (r.status === 200) {
                loadReviews();
                setMessage('Review removed successfully', MessageType.INFO);
            }
        })
    }

    function validateForm(newReview: Review): boolean {
        if (newReview.phoneNumber.length !== 9 || !(/^\d+$/.test(newReview.phoneNumber))) {
            setMessage('Please enter valid phone number');
            setIsPhoneNumberValid(false);
            console.log(isPhoneNumberValid)
            return false;
        } else {
            setIsPhoneNumberValid(true);
            console.log(isPhoneNumberValid)
            return true;
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newReview: Review = {...form};

        if (validateForm(newReview)) {
            ReviewService.addReview(newReview)
                .then(r => {
                        setReviews([...reviews, newReview])
                        setForm(defaultForm);
                        setMessage('Review submitted successfully', MessageType.INFO);
                    }
                )
                .catch(e => {
                    console.error(e)
                    if (e.response.data === "Phone number already exists") {
                        setIsPhoneNumberValid(false)
                        setMessage('Phone number already exists. Please try another one');
                    } else {
                        setMessage('An error occurred during review submission: ' + e.response.data);
                    }
                });
        }
    };

    return (
        <Box p={5}>
            <Heading as="h2" size="xl" mb={4} textAlign="center">
                Reviews
            </Heading>
            <VStack spacing={4} align="stretch">
                {reviews.length === 1 && reviews[0].message === "" ? <Text>No reviews yet</Text> : <></>}
                {reviews.length > 0 && reviews[0].message !== "" &&
                    reviews.map((review, index) => (
                        <Box key={index} p={4} borderWidth="1px" borderRadius="lg" shadow="md" width="full" mb={4}>
                            <HStack spacing={4} justifyContent="space-between" alignItems="center">
                                <Box flex="1">

                                    <Text fontSize="lg" fontWeight="bold">
                                        {review.name} {review.surname}
                                    </Text>
                                    <Text>{review.message}</Text>
                                    <HStack spacing={2} marginY={2}>
                                        {Array(5)
                                            .fill('')
                                            .map((_, i) => (
                                                <Icon key={i} as={FaStar}
                                                      color={i < review.rating ? 'yellow.400' : 'gray.300'}/>
                                            ))}
                                    </HStack>
                                </Box>
                                {isModerator &&
                                    <Box
                                        as="button"
                                        p={2}
                                        borderRadius="md"
                                        bg="transparent"
                                        _hover={{bg: "red.100"}}
                                        _active={{bg: 'red.200'}}
                                        onClick={() => deleteReview(index)}
                                    >
                                        <DeleteIcon color="red.500"/>
                                    </Box>
                                }
                            </HStack>
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
                                    +48
                                </InputLeftElement>
                                <Input name="phoneNumber" placeholder='Phone number' value={form.phoneNumber}
                                       onChange={handleChange} isInvalid={!isPhoneNumberValid} required/>
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
