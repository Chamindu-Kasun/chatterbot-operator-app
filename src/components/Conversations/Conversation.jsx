import React from "react";
import "./conversation.css"
import phoneImg from "../../assets/images/phone.jpg"

const Conversation = (props) => {
    const {conversation, currentUser} = props;
    // const senderId = conversation.members.find((member) => member !== currentUser._id);
    const client = conversation.client_name

    return (
        <div className="conversation">
            <img
                className={"conversationImg"}
                src={"https://images.pexels.com/photos/4547577/pexels-photo-4547577.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
                alt={""}
            />
            <span className="conversationName">{client}</span>
        </div>
    );
}

export default Conversation;