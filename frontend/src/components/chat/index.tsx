import ChatMessage from "./ChatMessage";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";

const Chat = () => {
  return (
    <div className="flex flex-col flex-grow h-full pb-10">
      <ChatHeader />
      <div className="flex-grow overflow-y-auto p-4 space-y-2">
        <ChatMessage isSender content={"hello"} createdAt={"10:00"}/>
        <ChatMessage isSender content={"aaaa aaaa dd ggt nnnnnn"} createdAt={"10:00"}/>
        <ChatMessage content={"hi"} createdAt={"10:30"}/>
        <ChatMessage content={"hidden md:flex flex-col flex-grow h-full md:w-full"} createdAt={"10:30"}/>
        <ChatMessage isSender content={"hello"} createdAt={"10:00"}/>
        <ChatMessage isSender content={"aaaa aaaa dd ggt nnnnnn"} createdAt={"10:00"}/>
        <ChatMessage content={"hi"} createdAt={"10:30"}/>
        <ChatMessage content={"hidden md:flex flex-col flex-grow h-full md:w-full"} createdAt={"10:30"}/>
        <ChatMessage isSender content={"hello"} createdAt={"10:00"}/>
        <ChatMessage 
          isSender 
          content={"aaaa aaaa dd ggt  hidden md:flex flex-col flex-grow h-full md:w-fullhidden md:flex flex-col flex-grow h-full md:w-full hidden md:flex flex-col flex-grow h-full md:w-full"} 
          createdAt={"10:00"}
        />
        <ChatMessage content={"hi"} createdAt={"10:30"}/>
        <ChatMessage 
          content={"hidden md:flex flex-col flex-grow h-full md:w-full hidden md:flex flex-col flex-grow h-full md:w-full hidden md:flex flex-col flex-grow h-full md:w-full"} 
          createdAt={"10:30"}
        />
      </div>
      <ChatFooter />
    </div>
  );
};

export default Chat;
