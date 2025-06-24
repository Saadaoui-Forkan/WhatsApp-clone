export type ChatMessageProps = {
  isSender: boolean;
  content: string;
  createdAt: string;
};

export interface MessageItemProps {
  name: string;
  avatar: string;
  id: string;
}

export interface IMessage {
  id: string;             
  content: string;
  seen: boolean;
  senderId: string;        
  receiverId: string;     
  createdAt: string;       
}

export interface IMessages {
  messages: IMessage[];
  setMessages: (messages: IMessage[]) => void;
  addMessage: (message: IMessage) => void;
}