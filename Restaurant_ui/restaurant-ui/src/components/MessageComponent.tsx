import { Box, Alert, AlertIcon, AlertTitle, AlertDescription, VStack, Fade } from '@chakra-ui/react';
import { useMessage, MessageType, Message } from '../MessageContext';

const MessageComponent = () => {
  const { messagesList: messagesList } = useMessage();
  
  return (
    <Box position="fixed" bottom="4" left="50%" transform="translateX(-50%)" zIndex="9999">
      <VStack spacing={4}>
        {messagesList.map((mess) => RenderComponent(mess))}
      </VStack>
    </Box>
  );
};
function RenderComponent(message :Message ) {
  var status: "warning" | "info" | "error" | "success" | "loading" | undefined;
  switch (message.type) {
    case MessageType.WARNING:
      status = 'warning';
      break;
    case MessageType.INFO:
      status = 'info';
      break;
    case MessageType.SUCCESS:
      status = 'success';
      break;
    default:
      status = 'error';
  }
  let title = status.charAt(0).toUpperCase() + status.slice(1);
 return  (
    <Fade key={message.id} in={true}>
      <Alert status={status} variant="solid" borderRadius="md" boxShadow="lg">
        <AlertIcon />
        <AlertTitle mr={2}>{title}</AlertTitle>
        <AlertDescription>{message.message}</AlertDescription>
      </Alert>
    </Fade>
  )
}

export default MessageComponent;
