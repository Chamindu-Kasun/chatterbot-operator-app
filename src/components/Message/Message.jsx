import profileImg from "../../assets/images/profile.jpg";
import "./Message.css"
import {format} from "timeago.js";
import {Container,Row,Col} from "react-bootstrap";

const Message = ({own, message, date}) => {
    return (
        <Container fluid={true}>
        <div className={own === true ? "message own" : "message"}>
            <div className={"messageTop"}>
                <img
                    className={"messageImg"}
                    src={own === true ? profileImg : "https://images.pexels.com/photos/4547577/pexels-photo-4547577.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
                    alt={""}
                />
                <div className={"messageText"}>
                    {message}
                    <p className="messageBottom">{format(date)}</p>
                </div>
            </div>
        </div>
        </Container>
    );
}

export default Message;