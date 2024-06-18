import React, { createContext, useContext, useState, ReactNode } from 'react';

const MESSAGE_CLEAR_TIME = 5000;

export enum MessageType {
  ERROR,
  WARNING,
  INFO,
  SUCCESS,
}

export interface Message {
  id: number;
  message: string;
  type?: MessageType;
}

interface MessageContextType {
  messagesList: Message[];
  message: (message: string,type?: MessageType) => void;
  resetMessage: (id: number) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within an MessageContext');
  }
  return context;
};

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [nextId, setNextId] = useState(1);

  const handleMessage = (message: string, type?: MessageType ) => {
    const id = nextId;
    setMessages([...messages, { id, message,type }]);
    setNextId(nextId + 1);
    setTimeout(() => {
      clearMessage(id);
    }, MESSAGE_CLEAR_TIME); 
  };

  const clearMessage = (id: number) => {
    setMessages(errors => errors.filter(error => error.id !== id));
  };

  const value: MessageContextType = {
    messagesList: messages,
    message: handleMessage,
    resetMessage: clearMessage,
  };

  return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>;
};
