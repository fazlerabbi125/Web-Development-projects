import React from 'react'
export type MessageType={
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const MessageContext= React.createContext<MessageType|null>(null);