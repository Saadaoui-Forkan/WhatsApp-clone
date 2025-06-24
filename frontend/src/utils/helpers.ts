import { IMessage } from "../types/message.types";
import { IFriend, IUser } from "../types/user.types";
import moment from "moment";

export const getContactById = (friends: IFriend[], receiverId: string): IFriend | undefined => {
  return friends.find((f) => f.id === receiverId);
};

export const getReceiverMessages = (messages: IMessage[], receiverId: string): IMessage[] => {
  return messages.filter(
    (message) =>
      message.senderId === receiverId || message.receiverId === receiverId
  );
}

export function formatMessageDate(createdAt: string | Date): string {
  const now = moment();
  const messageDate = moment(createdAt);
  const diffInHours = now.diff(messageDate, "hours");
  const diffInDays = now.diff(messageDate, "days");

  if (diffInHours < 24) {
    return messageDate.fromNow();
  } else if (diffInDays < 30) {
    return messageDate.fromNow();
  } else {
    return messageDate.format("DD-MM-YYYY"); 
  }
}