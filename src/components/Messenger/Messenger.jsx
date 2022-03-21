import "./messenger.css";
import TopBar from "../TopBar/TopBar";
import Conversation from "../Conversations/Conversation";
import Message from "../Message/Message";
import Operators from "../Operators/operators";
import {useContext, useState, useEffect, useRef} from "react";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import AlertMessage from "../Alert/AlertMessage";
import {Container,Row,Col} from "react-bootstrap";
import {HiMenuAlt4} from 'react-icons/hi';
import Sidebar from "../Sidebar/sidebar";

const Messenger = () => {
    //get current operator
    const {user} = useContext(AuthContext);

    //conversations
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [currentClient, setCurrentClient] = useState(null);

    //scroll
    const scrollRef = useRef();
    const socket = useRef()

    //socket
    const [messageFromSocket, setMessageFromSocket] = useState(null);
    const [onlineOperators, setOnlineOperators] = useState([]);

    //sidebar
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        socket.current = io("https://chatter-bot-app-socket-server.herokuapp.com");
        socket.current.on("getMessage", (data) => {
            setMessageFromSocket({
                sender: data.receiver,
                text: data.text,
                createdAt: Date.now(),
            })
        });
    }, [])

    useEffect(() => {
        socket.current.on("newClient", (message) => {
            setCurrentClient({
                sender: message.from,
                client: message.client,
                createdAt: Date.now(),
            })
        });
    },[])

    //get conversations
    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("https://mobios-chatter-app-backend.herokuapp.com/api/conversations/" + user._id)
                console.log("Conversations", res.data)
                setConversations(res.data);
            } catch (err) {
                console.log(err)
            }
        };
        getConversations();
    }, [user._id,currentClient])

    //get messages
    useEffect(() => {
        const getMessages = async () => {
            try {
                if(currentChat !== null) {
                    const res = await axios.get("https://mobios-chatter-app-backend.herokuapp.com/api/messages/" + currentChat?._id);
                    setMessages(res.data);
                }
            } catch (err) {
                console.log(err)
            }
        };
        getMessages();
    }, [currentChat])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        };

        const receiver = currentChat.members.find(member => member !== user._id);
        const media = currentChat.conversation_media

        //send msg to socket server
        socket.current.emit("sendMessage",{
            senderId : user._id,
            receiverId : "123456789",
            text: newMessage,
            receiver,
            media
        })

        //send msg to db
        try {
            const res = await axios.post("https://mobios-chatter-app-backend.herokuapp.com/api/messages", message);
            setMessages([res.data,...messages]);
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    //operator socket connection
     useEffect(()=>{
        socket.current.emit("addUser", user._id , (error) => {
            if(error){
                console.log(error);
            }
        });

         socket.current.on("getUsers", users => {
             setOnlineOperators(users);
         })
     },[user])

    useEffect(() => {
        messageFromSocket &&
            currentChat?.members.includes(messageFromSocket.sender) &&
            setMessages((prev) => [ messageFromSocket, ...prev]);
        // setMessages([ ...messages,messageFromSocket]);
    },[messageFromSocket,currentChat])


    const handleAcceptConfirm = async() => {
            socket.current.emit("clientAccepted", {
                operatorId: user._id,
                receiverId: "123456789"
            })
            await sendAcceptConfirmMessage(currentClient.client.senderId,user._id, user.username, currentClient.client.media);
            setCurrentClient(null)
    }

    const sendAcceptConfirmMessage =async (ClientId,OperatorId, Operator,media) => {
            const client = {
                senderId: ClientId,
                operatorId: OperatorId,
                operatorName: Operator,
                media: media,
            };
            await axios.post("https://mobios-chatter-app-backend.herokuapp.com/operator", client);
    }

    const showAlert = () => {
        if(currentClient !== null) {
            return (
                <AlertMessage
                    client={currentClient}
                    onAccept={handleAcceptConfirm}
                />
            );
        }
    }

    const getCurrentChatUser = () => {
        const client = currentChat.client_name
        const media = currentChat.conversation_media

        return(
            <div className="mx-1">
                {client} from {media}
                <div className="navbar-toggler-icon float-end border">
                <HiMenuAlt4 onClick={() => setToggle(true)}/>
                </div>
            </div>
        )
    }

    return (
        <Container fluid>
            <Row>
                <TopBar/>
            </Row>
            {showAlert()}
            <Row className="messenger">
                    <Col className="chatMenu px-0" xs={12} lg={3} md={3}>
                        <div className="chatMenuWrapper">
                            <h4 className="rightbarTitle">Client Messages</h4>
                            {/*Map each conversation*/}
                            {conversations.map((conversation, index) => (
                                <div onClick={() => setCurrentChat(conversation)} key={index}>
                                    <Conversation
                                        key={index}
                                        conversation={conversation}
                                        currentUser={user}
                                    />
                                </div>
                            ))}
                        </div>
                    </Col>

                    <Col className="chatBox px-0 py-0" xs={12} lg={6} md={9}>
                        <div className="chatBoxWrapper px-0 mx-3 py-0">
                            {currentChat ? (
                                    <>
                                        <Row className="py-3 active-chat px-0 ">
                                            <Col className="text-center">
                                                {getCurrentChatUser()}
                                            </Col>
                                        </Row>

                                        <Row className="chatBoxTop">
                                            {toggle && (<Sidebar setToggle={setToggle}/>)}
                                            {/*Map each message*/}
                                            {messages.slice(0).reverse().map((message, index) => (
                                                <div className="chatBoxMsg my-0 py-0" ref={scrollRef} key={index}>
                                                    <Message
                                                        key={index}
                                                        message={message.text}
                                                        date={message.createdAt}
                                                        own={message.sender === user._id}
                                                    />
                                                </div>
                                            ))}
                                        </Row>
                                        <Row className="chatBoxBottom py-2">
                                            <Col lg={10} className="mx-0" >
                                                 <textarea
                                                     className="chatMessageInput"
                                                     placeholder="message"
                                                     onChange={(e) => setNewMessage(e.target.value)}
                                                     value={newMessage}
                                                 />
                                            </Col>
                                            <Col lg={2}>
                                                <button
                                                    className="chatSubmitButton"
                                                    onClick={handleSubmit}
                                                >Send
                                                </button>
                                            </Col>
                                        </Row>
                                    </>
                                ) :
                                <span className="noConversationText">
                                    Select a conversation to response.
                                </span>
                            }
                        </div>
                    </Col>

                    <Col className="chatOnline" xs={12} lg={3} md={3}>
                        <div className="chatOnlineWrapper">
                            <h4 className="rightbarTitle">Operators</h4>
                            <Operators
                               onlineOperators = {onlineOperators}
                               currentUserId = {user._id}
                               setCurrentChat = {setCurrentChat}
                            />
                        </div>
                    </Col>
            </Row>
        </Container>
    );
}

export default Messenger;