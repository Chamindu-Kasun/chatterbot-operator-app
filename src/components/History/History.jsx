import { useState, useEffect } from "react";
import axios from "axios";
import PrevConversation from "../PrevConversations/PrevConv";
import Message from "../Message/Message";
import { HiX } from "react-icons/hi";
import "./History.css";
import { useSelector } from "react-redux";

const History = (props) => {
  const { clientId, operatorId } = props;
  const [conversations, setConversations] = useState([]);
  const [viewChat, setViewChat] = useState(false);
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const operators = useSelector((state) => state.operators.operators);
  const [operator, setOperator] = useState(null);

  useEffect(() => {
    let currentOperator = "";
    for (let i = 0; i < operators.length; i++) {
      for (let j = 0; j < chat?.members.length; j++) {
        if (operators[i]?._id === chat.members[j]) {
          currentOperator = operators[i];
        }
      }
    }
    setOperator(currentOperator);
  }, [viewChat]);

  //get conversations
  useEffect(() => {
    const client = {
      clientId: clientId,
      operatorId: operatorId,
    };

    const getConversations = async () => {
      try {
        // const res = await axios.get(
        //   "https://mobios-chatter-app-backend.herokuapp.com/api/conversations/" +
        //     user._id
        // );
        const res = await axios.post(
          "http://localhost:5000/api/conversations/history",
          client
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [clientId]);

  //get messages
  useEffect(() => {
    const getMessages = async () => {
      try {
        if (chat !== null) {
          // const res = await axios.get(
          //   "https://mobios-chatter-app-backend.herokuapp.com/api/messages/" +
          //     currentChat?._id
          // );
          const res = await axios.get(
            "http://localhost:5000/api/messages/" + chat?._id
          );
          setMessages(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [chat]);

  const identifyChat = (conversation) => {
    setChat(conversation);
    setViewChat(true);
    // dispatch(addCurrentChat(conversation));
  };

  return (
    <div>
      {viewChat === false ? (
        <div>
          {/*Map each conversation*/}
          {conversations.map((conversation, index) => (
            <div
              onClick={() => {
                identifyChat(conversation);
              }}
              key={index}
            >
              <PrevConversation
                key={index}
                conversation={conversation}
                operators={operators}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className="w-100 h-5 d-flex justify-content-end top-cross">
            <h6 className="chat-header">
              conversation with {operator?.username}
            </h6>
            <HiX
              size={20}
              onClick={() => setViewChat(false)}
              className="cross-icon p-0 m-0"
            />
          </div>
          <div className="chatBox">
            {messages
              .slice(0)
              .reverse()
              .map((message, index) => (
                <div className="chatMsg my-0 py-0" key={index}>
                  <Message
                    key={index}
                    message={message.text}
                    date={message.createdAt}
                    own={message.sender !== clientId.toString()}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
