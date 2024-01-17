import {
	Flex,
	Button,
	Text,
	HStack,
	FormControl,
	FormLabel,
	Textarea,
	Input,
	Spacer,
	Table,
	Td,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import Divider from "./Divider";
import Messages from "./Messages";
import Footer from "./Footer";
import { getAllConversation, getMessages } from "../../utils/api";
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
			// let tempArray = [];
			// let i = 10;
			// while (i--) {
			// 	tempArray.push(...res.data.data);
			// }
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
				for (let key in tempLead) {
					if (tempLead[key] === "NA") {
						tempLead[key] = "";
					}
				}
				setLead(tempLead);
			});
		}
	}, [currentConversation]);
	useEffect(() => {}, [isTyping]);
	return (
		<Flex flexDir="column">
			<Flex
				w="100%"
				h="100vh"
				justify="left"
				align="flex-start"
				gap="30px"
			>
				<Flex
					w={"30%"}
					flexDir="column"
					gap="10px"
					h="90%"
					justifyContent="flex-start"
					alignItems={"flex-start"}
					overflowY={"auto"}
					overflowX={"hidden"}
				>
					<Text fontSize="1.5rem" fontWeight="700">
						Chat History
					</Text>
					{chatHistories.map((item) => (
						<>
							<Flex
								w="270px"
								bgColor={
									currentConversation === item.uid
										? "#fff"
										: "#D9D9D9"
								}
								padding="10px 25px"
								borderRadius="12px"
								border={
									currentConversation === item.uid
										? "1px solid #000"
										: "1px solid #ffffff"
								}
								_hover={{
									cursor: "pointer",
									bgColor: "#BFBFBF",
									border: "1px solid #000000",
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

				<Flex w={"100%"} h="90%" flexDir="column" align="center">
					{/* <Header /> */}
					<Divider />
					<Messages messages={messages} />
					<Divider />
				</Flex>
			</Flex>
			{lead && (
				<Flex w="100%" flexDir={"column"}>
					<Text fontSize="1.5rem" fontWeight="700">
						Conversation summarize
					</Text>
					<FormControl>
						<Table>
							<Td w="400px">
								<Flex flexDir="row">
									<FormLabel
										color="#424856"
										fontSize="1rem"
										fontWeight="700"
									>
										Interest:
									</FormLabel>
									<Text
										color="#424856"
										fontSize="1rem"
										fontWeight="400"
									>
										{lead.interest}
									</Text>
								</Flex>
								<Flex flexDir="row">
									<FormLabel
										color="#424856"
										fontSize="1rem"
										fontWeight="700"
									>
										Preferred callback times:
									</FormLabel>
									<Text
										color="#424856"
										fontSize="1rem"
										fontWeight="400"
									>
										{lead.preferred_callback_times}
									</Text>
								</Flex>
								<Flex flexDir="row">
									<FormLabel
										color="#424856"
										fontSize="1rem"
										fontWeight="700"
									>
										Demo:
									</FormLabel>
									<Text
										color="#424856"
										fontSize="1rem"
										fontWeight="400"
									>
										{lead.demo}
									</Text>
								</Flex>
								<Flex flexDir="row">
									<FormLabel
										color="#424856"
										fontSize="1rem"
										fontWeight="700"
									>
										Demo schedule:
									</FormLabel>
									<Text
										color="#424856"
										fontSize="1rem"
										fontWeight="400"
									>
										{lead.demo_schedule}
									</Text>
								</Flex>
								<Flex flexDir="row">
									<FormLabel
										color="#424856"
										fontSize="1rem"
										fontWeight="700"
									>
										Budget:
									</FormLabel>
									<Text
										color="#424856"
										fontSize="1rem"
										fontWeight="400"
									>
										{lead.budget}
									</Text>
								</Flex>
								<Flex flexDir="row">
									<FormLabel
										color="#424856"
										fontSize="1rem"
										fontWeight="700"
									>
										Summary of the conversation:
									</FormLabel>
									<Text
										color="#424856"
										fontSize="1rem"
										fontWeight="400"
									>
										{lead.summarize_conversation}
									</Text>
								</Flex>
							</Td>
							<Td w="400px">
								<Flex flexDir="row">
									<FormLabel
										color="#424856"
										fontSize="1rem"
										fontWeight="700"
									>
										Decision-makers and process:
									</FormLabel>
									<Text
										color="#424856"
										fontSize="1rem"
										fontWeight="400"
									>
										{lead.decision_makers_and_process}
									</Text>
								</Flex>
								<Flex flexDir="row">
									<FormLabel
										color="#424856"
										fontSize="1rem"
										fontWeight="700"
									>
										Pain points:
									</FormLabel>
									<Text
										color="#424856"
										fontSize="1rem"
										fontWeight="400"
									>
										{lead.pain_points}
									</Text>
								</Flex>
								<Flex flexDir="row">
									<FormLabel
										color="#424856"
										fontSize="1rem"
										fontWeight="700"
									>
										Competitors:
									</FormLabel>
									<Text
										color="#424856"
										fontSize="1rem"
										fontWeight="400"
									>
										{lead.competitors}
									</Text>
								</Flex>
								<Flex flexDir="row">
									<FormLabel
										color="#424856"
										fontSize="1rem"
										fontWeight="700"
									>
										Timeline:
									</FormLabel>
									<Text
										color="#424856"
										fontSize="1rem"
										fontWeight="400"
									>
										{lead.timeline}
									</Text>
								</Flex>
								<Flex flexDir="row">
									<FormLabel
										color="#424856"
										fontSize="1rem"
										fontWeight="700"
									>
										Previous solutions experience:
									</FormLabel>
									<Text
										color="#424856"
										fontSize="1rem"
										fontWeight="400"
									>
										{lead.previous_solutions_experience}
									</Text>
								</Flex>
							</Td>
						</Table>
					</FormControl>
				</Flex>
			)}
			<Button w="fit-content" alignSelf={"flex-end"}>
				{"Convert to lead ▶"}
			</Button>
		</Flex>
	);
};

export default ChatBox;
