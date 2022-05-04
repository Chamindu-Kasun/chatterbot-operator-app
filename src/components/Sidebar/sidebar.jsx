import { motion } from "framer-motion/dist/framer-motion";
import { HiX } from "react-icons/hi";
import "./sidebar.css";
import { useState } from "react";
import Transfer from "../Transfer/Transfer";
import { useDispatch } from "react-redux";
import { addSelectedOperator } from "../../redux/onlineOperators/onlineOperatorsSlice";

const Sidebar = (props) => {
  const {
    setToggle,
    sendTransferRequestMessage,
    transferRequestAccept,
    setTransferRequestAccept,
    setViewHistory,
    closeConversation,
  } = props;
  const [transfer, setTransfer] = useState(false);
  const dispatch = useDispatch();

  const handleClick = (request) => {
    if (request === "Transfer-Client") setTransfer(true);
    if (request === "History") setViewHistory(true);
    if (request === "End-Chat") closeConversation();
  };

  const handleClose = (e) => {
    setToggle(false);
    dispatch(addSelectedOperator([]));
  };

  const showRelevent = () => {
    if (transfer === true) {
      return (
        <div className="w-100 h-100 justify-content-center align-items-center">
          <Transfer
            sendTransferRequestMessage={sendTransferRequestMessage}
            transferRequestAccept={transferRequestAccept}
            setToggle={setToggle}
            setTransferRequestAccept={setTransferRequestAccept}
          />
        </div>
      );
    } else {
      return (
        <ul>
          {[
            "Transfer-Client",
            "History",
            "End-Chat",
            "Send-Document",
            "View-Info",
          ].map((item) => (
            <li key={item}>
              <a href={`#${item}`} onClick={() => handleClick(item)}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <motion.div className="sidebar">
      <HiX onClick={() => handleClose()} className="sidebar-close" />
      {showRelevent()}
    </motion.div>
  );
};

export default Sidebar;
