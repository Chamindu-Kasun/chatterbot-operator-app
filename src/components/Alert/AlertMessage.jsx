import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from "react-bootstrap/Alert";
import Button from 'react-bootstrap/Button';
import {useState, useEffect} from "react";

const AlertMessage = (props) => {
    const {onAccept,client} = props;
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
    },[client])

        return (
            <>
                <Alert show={show} variant="success">
                    <Alert.Heading>Operator Requested !</Alert.Heading>
                    <p>
                        A client has requested for an operator support. Are you available now?
                    </p>
                    <hr/>
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => {
                            setShow(false)
                            onAccept()
                        }} variant="outline-success">
                            Available!
                        </Button>
                        <Button className={"ms-5"} onClick={() => setShow(false)} variant="outline-danger">
                            Not Available!
                        </Button>
                    </div>
                </Alert>
            </>
        );
}

export default AlertMessage;