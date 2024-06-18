import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from './ColorModeSwitcher';

const Header = () => {
  return (
    <Box>
      <ColorModeSwitcher justifySelf="flex-end" />
      <Link to="/">
        <Flex alignItems="center" justifyContent="center">
          <Image
            boxSize="258px"
            src="images/logo.svg"
            alt="Restaurant Logo"

          />
          <Text fontSize="3xl" fontWeight="bold" >
            <Text as="span" bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text'>REST</Text>
            aurant
          </Text>
        </Flex>
      </Link>
    </Box>
  );
};

export default Header;
