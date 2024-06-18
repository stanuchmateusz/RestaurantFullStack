import { Box, Heading, Text, VStack } from '@chakra-ui/react';

const Contact = () => {
  const link: string = "https://www.openstreetmap.org/export/embed.html?bbox=19.896669387817386%2C50.0515728172995%2C19.918749332427982%2C50.06942568554287&amp;layer=mapnik&amp;marker=50.05949446997364%2C19.90848183631897";
  return (
    <Box p={5}>
      <Heading as="h1" size="2xl" mb={4} textAlign="center">
        Contact Us
      </Heading>
      <VStack spacing={4} align="stretch">
        <Box>
          <Heading as="h2" size="lg" mb={2}>
            Our Location
          </Heading>
          <Box
            as="iframe"
            width="100%"
            height="400px"
            border="0"
            loading="lazy"
            src={link}
          ></Box>
        </Box>
        <Box>
          <Heading as="h2" size="lg" mb={2}>
            Address
          </Heading>
          <Text fontSize="lg">
            123 Main Street
            <br />
            New York, NY 10001
          </Text>
        </Box>
        <Box>
          <Heading as="h2" size="lg" mb={2}>
            Phone
          </Heading>
          <Text fontSize="lg">(123) 456-7890</Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default Contact;
