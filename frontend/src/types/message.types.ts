export type ChatMessageProps = {
  isSender: boolean;
  content: string;
  createdAt: string;
  seen?: boolean;
};

export interface MessageItemProps {
  conversation: IConversation;
  onClick?: () => void;
}

export interface IMessage {
  id: string;             
  content: string;
  seen: boolean;
  senderId: string;        
  receiverId: string;     
  createdAt: string;       
}

export interface IConversation {
  user: {
    id: string;
    name: string;
    email: string;
    bio?: string;
    profilePicture?: {
      publicId: string;
      secureUrl: string;
    } | null;
  };
  lastMessage: IMessage | null;
  unreadCount: number;
}

export interface IMessages {
  messagesByUser: Record<string, IMessage[]>;
  setMessagesForUser: (userId: string, messages: IMessage[]) => void;
  addMessage: (currentUserId: string, message: IMessage) => void;
  prependMessages: (userId: string, messages: IMessage[]) => void;
  updateMessageSeen: (userId: string, messageIds: string[]) => void;
  markAllAsSeen: (userId: string) => void;
}

export type UserPanelProps = {
  onItemClick?: () => void;
};