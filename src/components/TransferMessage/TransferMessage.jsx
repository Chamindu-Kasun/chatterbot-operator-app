const TransferMessage = (props) => {
  const { handleTransferConfirm, transferRequest } = props;
  return (
    <div className="alert alert-success text-center my-0" role="alert">
      <h4 className="alert-heading">Operator requested!</h4>
      <p>
        {transferRequest?.senderName} has requested you to accept a new client
      </p>
      <hr />
      <div className="d-flex justify-content-center align-items-center">
        <button
          type="button"
          className="btn btn-primary mx-5"
          onClick={(e) =>
            handleTransferConfirm(transferRequest?.senderId, "Accept")
          }
        >
          Accept
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={(e) =>
            handleTransferConfirm(transferRequest?.senderId, "Reject")
          }
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default TransferMessage;
