import { useSelector, useDispatch } from "react-redux";
import { createConversation } from "../../redux/apiCalls/conversations";
import { Button } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { addSelectedOperator } from "../../redux/onlineOperators/onlineOperatorsSlice";

const Transfer = (props) => {
  const {
    sendTransferRequestMessage,
    transferRequestAccept,
    setToggle,
    setTransferRequestAccept,
  } = props;
  const operators = useSelector((state) => state.onlineOperators.operators);
  const currentChat = useSelector((state) => state.currentChat.currentChat);
  const dispatch = useDispatch();
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [transferAccept, setTransferAccept] = useState(null);
  const { user } = useContext(AuthContext);

  const sendNotification = () => {
    dispatch(
      addSelectedOperator([selectedOperator?._id, selectedOperator?.username])
    );
    sendTransferRequestMessage(selectedOperator?._id);
  };

  const transferConversation = () => {
    const operatorId = user?._id;
    createConversation(dispatch, {
      currentChat,
      selectedOperatorId: selectedOperator?._id,
      selectedOperatorName: selectedOperator?.username,
      operatorId,
    });
    setTransferRequestAccept(null);
    setTransferAccept(null);
    setToggle(false);
  };

  const transferConversationReject = () => {
    setTransferRequestAccept(null);
    setTransferAccept(null);
    setToggle(false);
  };

  useEffect(() => {
    setTransferAccept(transferRequestAccept);
  }, [transferRequestAccept]);
  console.log("transferRequestAccept", transferAccept);

  const acceptConfirm = () => {
    return (
      <div>
        <div className="d-flex justify-content-center my-4 border-bottom align-items-center">
          <h6>{selectedOperator?.username} Has Accepted Your Request</h6>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Button
            type="button"
            className="btn btn-success btn-lg"
            onClick={transferConversation}
          >
            Transfer
          </Button>
        </div>
      </div>
    );
  };

  const acceptDenied = () => {
    return (
      <div>
        <div className="d-flex justify-content-center my-4 border-bottom align-items-center">
          <h6>{selectedOperator?.username} Has Denied Your Request</h6>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Button
            type="button"
            className="btn btn-danger btn-lg"
            onClick={transferConversationReject}
          >
            Exit
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {transferAccept !== null ? (
        <div>
          {transferAccept?.message === "Accept" ? (
            <div>{acceptConfirm()}</div>
          ) : (
            <div>{acceptDenied()}</div>
          )}
        </div>
      ) : (
        <div>
          {selectedOperator !== null ? (
            <div>
              <div className="d-flex justify-content-center my-4 border-bottom align-items-center">
                <h6>
                  Continue transfer client to {selectedOperator?.username}
                </h6>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <Button
                  type="button"
                  className="btn btn-success btn-lg"
                  onClick={sendNotification}
                >
                  Continue
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="d-flex justify-content-center my-4 border-bottom align-items-center">
                <h6>Please select an Operator</h6>
              </div>
              {operators.map((operator) => (
                <div
                  key={operator?._id}
                  className="chatOnlineFriend my-2"
                  onClick={() => {
                    setSelectedOperator(operator);
                  }}
                >
                  <div className="chatOnlineImgContainer">
                    <img
                      className="chatOnlineImg"
                      src={
                        "https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                      }
                      alt=""
                    />
                    <div className="chatOnlineBadge"></div>
                  </div>
                  <span className="chatOnlineName ms-5">
                    {operator?.username}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      ;
    </div>
  );
};

export default Transfer;
