import { Flex, Button, Text, HStack } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import Header from './Header'
import Divider from './Divider'
import Messages from './Messages'
import Footer from './Footer'
import {
    sendMessage,
    generateLead,
    createConversation,
    getAllConversation,
    getMessages,
} from '../../utils/api'
import { AuthContext } from '../../context/auth.context'
const ChatBox = () => {
    // const getInitialInputMessagestate = () => {
    //   const inputMessage = localStorage.getItem("inputMessage");
    //   return inputMessage ? JSON.parse(inputMessage) : false
    // };
    const [isTyping, setIsTyping] = useState(false)
    const { currentUser } = useContext(AuthContext)
    const [chatHistories, setChatHistories] = useState([])
    const getInitialMessagesState = () => {
        const messages = localStorage.getItem('messages')
        return messages ? JSON.parse(messages) : []
    }
    const [inputMessage, setInputMessage] = useState('')
    const [messages, setMessages] = useState(getInitialMessagesState)
    const [currentConversation, setCurrentConversation] = useState('')
    const handleSendMessage = () => {
        if (!inputMessage.trim().length) {
            return
        }
        const data = inputMessage
        const array = [...messages, { from: 'me', text: data, role: 'user' }]
        setMessages(array)
        setInputMessage('')
        let arrayMessage = []
        for (let message of messages) {
            arrayMessage.push(`${message.role}: ${message.text}`)
        }
        sendMessage({
            conversation_history: arrayMessage,
            human_say: data,
        }).then((res) => {
            setMessages([
                ...array,
                {
                    from: 'computer',
                    text: res.data.say,
                    role: 'assistant',
                },
            ])
        })
    }
    const handleEndConversation = () => {
        let arrayMessage = []
        for (let message of messages) {
            arrayMessage.push(`${message.role}: ${message.text}`)
        }
        generateLead(arrayMessage).then((res) => {
            let tempArray = []
            for (let message of messages) {
                tempArray.push({
                    content: message.text,
                    role: message.role,
                    index: messages.indexOf(message),
                })
            }
            createConversation([
                ...tempArray,
                {
                    content: res.data,
                    role: 'assistant',
                    index: messages.length,
                },
            ]).then((res) => {
                setChatHistories([...chatHistories, res.data.data])
                setMessages([])
                localStorage.setItem('messages', JSON.stringify([]))
                setInputMessage('')
            })
        })
    }
    useEffect(() => {
        localStorage.setItem('messages', JSON.stringify(messages))
    }, [messages])
    useEffect(() => {
        setMessages([])
        getAllConversation(currentUser && currentUser.uid).then((res) => {
            setChatHistories(res.data.data)
        })
    }, [])
    useEffect(() => {
        if (currentConversation !== '') {
            getMessages(
                currentUser && currentUser.uid,
                currentConversation && currentConversation
            ).then((res) => {
                let tempArray = []
                for (let message of res.data.data) {
                    tempArray.push({
                        from: message.role === 'user' ? 'me' : 'computer',
                        text: message.content,
                        role: message.role,
                    })
                }
                tempArray.pop()
                setMessages(tempArray)
            })
        }
    }, [currentConversation])
    useEffect(() => {}, [isTyping])
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
                <Button
                    colorScheme="blackAlpha"
                    color="#FFFFFF"
                    paddingX="20px"
                    bgColor="#444444"
                    borderRadius="12px"
                    fontWeight="400"
                    onClick={() => {
                        setMessages([])
                        setIsTyping(false)
                    }}
                >
                    + Create new chat
                </Button>
                {chatHistories.map((item) => (
                    <>
                        <Flex
                            w="270px"
                            bgColor="#D9D9D9"
                            padding="10px 25px"
                            borderRadius="12px"
                            _hover={{
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                setCurrentConversation(item.uid)
                                setIsTyping(true)
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
                                        ).toLocaleDateString('en-UK')}{' '}
                                    </Text>
                                </HStack>
                            </Flex>
                        </Flex>
                    </>
                ))}
            </Flex>

            <Flex
                w={['100%', '100%', '40%']}
                h="90%"
                flexDir="column"
                align="center"
            >
                <Header />
                <Divider />
                <Messages messages={messages} />
                <Divider />
                {!isTyping && (
                    <>
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
                                onClick={handleEndConversation}
                            >
                                End conversation
                            </Button>
                        </Flex>
                    </>
                )}
            </Flex>
        </Flex>
    )
}

export default ChatBox
