import { useState, useEffect } from "react";
import { format } from "timeago.js";

const PrevConversation = (props) => {
  const { conversation, operators } = props;
  // const senderId = conversation.members.find((member) => member !== currentUser._id);
  const client = conversation.client_name;
  const date = conversation.createdAt;
  const [operator, setOperator] = useState(null);

  useEffect(() => {
    let currentOperator = "";
    for (let i = 0; i < operators.length; i++) {
      for (let j = 0; j < conversation.members.length; j++) {
        if (operators[i]?._id === conversation.members[j]) {
          currentOperator = operators[i];
        }
      }
    }
    setOperator(currentOperator);
  }, []);

  return (
    <div className="conversation">
      <img
        className={"conversationImg"}
        src={
          "https://images.pexels.com/photos/4547577/pexels-photo-4547577.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        }
        alt={""}
      />
      <span className="conversationName">{client}</span>
      <span className="mx-5 converastion-text">
        {format(date)} with {operator?.username}
      </span>
    </div>
  );
};

export default PrevConversation;
