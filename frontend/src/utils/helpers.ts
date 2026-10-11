import { IMessage } from "../types/message.types";
import { IFriend, IUser } from "../types/user.types";
import moment from "moment";

/**
 * Normalize a user coming from the API into the shape used by the auth store.
 * The backend returns `profilePicture` as an object ({ publicId, secureUrl })
 * while the store/UI expect the flat `photoProfile` string.
 */
export const normalizeUser = (raw: any): IUser => ({
  id: raw?.id,
  name: raw?.name,
  bio: raw?.bio ?? undefined,
  isAccountVerified: raw?.isAccountVerified,
  photoProfile:
    raw?.photoProfile ?? raw?.profilePicture?.secureUrl ?? "",
});

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