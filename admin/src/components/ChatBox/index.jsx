import {
	Flex,
	Button,
	Text,
	HStack,
	FormControl,
	FormLabel,
	Textarea,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import Header from "./Header";
import Divider from "./Divider";
import Messages from "./Messages";
import Footer from "./Footer";
import {
	sendMessage,
	generateLead,
	createConversation,
	getAllConversation,
	getMessages,
} from "../../utils/api";
import { AuthContext } from "../../context/auth.context";
const ChatBox = () => {
	// const getInitialInputMessagestate = () => {
	//   const inputMessage = localStorage.getItem("inputMessage");
	//   return inputMessage ? JSON.parse(inputMessage) : false
	// };
	const [lead, setLead] = useState(null);
	const [isTyping, setIsTyping] = useState(false);
	const { currentUser } = useContext(AuthContext);
	const [chatHistories, setChatHistories] = useState([]);
	const getInitialMessagesState = () => {
		const messages = localStorage.getItem("messages");
		return messages ? JSON.parse(messages) : [];
	};
	const [messages, setMessages] = useState(getInitialMessagesState);
	const [currentConversation, setCurrentConversation] = useState("");
	useEffect(() => {
		localStorage.setItem("messages", JSON.stringify(messages));
	}, [messages]);
	useEffect(() => {
		getAllConversation(currentUser && currentUser.uid).then((res) => {
			console.log(res.data.data);
			setChatHistories(res.data.data);
			setCurrentConversation(res.data.data[0].uid);
		});
	}, []);

	useEffect(() => {
		if (currentConversation !== "") {
			getMessages(
				currentUser && currentUser.uid,
				currentConversation && currentConversation
			).then((res) => {
				let tempArray = [];
				for (let message of res.data.data) {
					tempArray.push({
						from: message.role === "user" ? "me" : "computer",
						text: message.content,
						role: message.role,
					});
				}
				const tempLead = JSON.parse(
					tempArray[tempArray.length - 1].text
				);
				tempArray.pop();
				setMessages(tempArray);
				setLead(tempLead);
			});
		}
	}, [currentConversation]);
	useEffect(() => {}, [isTyping]);
	return (
		<Flex
			w="100%"
			h="100vh"
			justify="center"
			align="center"
			mt="100px"
			gap="30px"
		>
			<Flex
				flexDir="column"
				gap="10px"
				mt="100px"
				h="100%"
				justifyContent="flex-start"
			>
				{chatHistories.map((item) => (
					<>
						<Flex
							w="270px"
							bgColor="#D9D9D9"
							padding="10px 25px"
							borderRadius="12px"
							_hover={{
								cursor: "pointer",
							}}
							onClick={() => {
								setCurrentConversation(item.uid);
								setIsTyping(true);
							}}
						>
							<Flex flexDir="column">
								<Text
									fontSize=".625rem"
									color="black"
									fontWeight="300"
								>
									{item.uid}
								</Text>
								<HStack gap="10px">
									<Text
										color="black"
										fontWeight="700"
										fontSize="0.75rem"
									>
										Date:
									</Text>
									<Text
										fontSize=".625rem"
										color="black"
										fontWeight="300"
									>
										{new Date(
											item.created_at
										).toLocaleDateString("en-UK")}{" "}
									</Text>
								</HStack>
							</Flex>
						</Flex>
					</>
				))}
			</Flex>

			<Flex
				w={["100%", "100%", "40%"]}
				h="90%"
				flexDir="column"
				align="center"
			>
				<Header />
				<Divider />
				<Messages messages={messages} />
				<Divider />
			</Flex>
			<Flex h="full" w="30%" mt="100px">
				<FormControl>
					<FormLabel>Conversation summarize</FormLabel>
					<Textarea
						// isDisabled={true}
						h="80%"
						w="100%"
						value={lead && JSON.stringify(lead, null, "\t")}
					/>
				</FormControl>
			</Flex>
		</Flex>
	);
};

export default ChatBox;
