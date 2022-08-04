import React from 'react'

export interface MessageInterface{
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const MessageContext= React.createContext<MessageInterface|null>(null);