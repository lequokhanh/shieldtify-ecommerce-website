// import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
// import {
//   MainContainer,
//   ChatContainer,
//   MessageList,
//   Message,
//   MessageInput,
// } from "@chatscope/chat-ui-kit-react";

// const ChatBox = () => {
//   return (
//     <div style={{ position: "relative", height: "500px", marginTop: "200px" } }>
//       <MainContainer>
//         <ChatContainer>
//           <MessageList>
//             <Message
//               model={{
//                 message: "Hello my friend",
//                 sentTime: "just now",
//                 sender: "Joe",
//               }}
//             />
//           </MessageList>
//           <MessageInput placeholder="Type message here" />
//         </ChatContainer>
//       </MainContainer>
//     </div>
//   )
// }

// export default ChatBox;

import {
    Flex,
    Button,
    Box,
    Text,
    HStack
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Header from './Header';
import Divider from './Divider';
import Messages from './Messages';
import Footer from './Footer'


const ChatBox = () => {
  // const getInitialInputMessagestate = () => {
  //   const inputMessage = localStorage.getItem("inputMessage");
  //   return inputMessage ? JSON.parse(inputMessage) : false 
  // };
  const [chatHistories, setChatHistories] = useState([]);
  const getInitialMessagesState = () => {
    const messages = localStorage.getItem("messages");
    return messages ? JSON.parse(messages) : []
  }
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState(getInitialMessagesState);
  const handleSendMessage = () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage;
    messages.push({ from: "me", text: data, role: "user" });
    localStorage.setItem("messages", JSON.stringify(messages));
    // setMessages((old) => [...old, { from: "me", text: data }]);

    setInputMessage("");

    // setTimeout(() => {
      messages.push({ from: "computer", text: data, role: "assistant" })
      localStorage.setItem("messages", JSON.stringify(messages));

      setMessages(messages);
    // }, 1000);
  };
  useEffect(() => {
    
  },[messages])
  return (
      <Flex w="100%" h="100vh" justify="center" align="center" mt="100px">
        <Flex flexDir="column">
          {
            chatHistories.map((item) => (
              <>
                <Flex w="270px" bgColor="#D9D9D9" padding="10px 25px">
                  <Flex flexDir="column">
                    <Text fontSize=".625rem" color="black" fontWeight="300">
                      {item.uid}
                    </Text>
                    <HStack gap='10px'>
                      <Text color="black" fontWeight="700" fontSize="0.75rem"> 
                        Date: 
                      </Text>
                      <Text fontSize=".625rem" color="black" fontWeight="300">
                        {item.date}
                      </Text>
                    </HStack>
                  </Flex>
                </Flex>
              </>
            ))
          }
        </Flex>
        <Flex w={["100%", "100%", "40%"]} h="90%" flexDir="column" align="center" >
          <Header />
          <Divider />
          <Messages messages={messages}/>
          <Divider />
          <Footer
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSendMessage={handleSendMessage}
          />
          <Flex mt="40px" justifyContent="flex-end" w="full">
            <Button
            colorScheme="blackAlpha"
            color="#FFFFFF"
            paddingX="20px"
            bgColor="#444444"
            borderRadius="12px"
            fontWeight="400"
            >
              End conversation
            </Button>
          </Flex>
        </Flex>
      </Flex>
    );
}

export default ChatBox;