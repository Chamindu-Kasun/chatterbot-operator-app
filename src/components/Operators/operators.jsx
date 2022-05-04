import React, { useState, useEffect } from "react";
import "./operators.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addOnlineOperators } from "../../redux/onlineOperators/onlineOperatorsSlice";
import { addOperators } from "../../redux/slice/operatorsSlice";

const Operators = (props) => {
  const { onlineOperators } = props;
  const [operators, setOperators] = useState([]);
  const [online, setOnline] = useState([]);
  const [offline, setOffline] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getOperators = async () => {
      const res = await axios.get(
        "https://mobios-chatter-app-backend.herokuapp.com/api/operators"
      );
      setOperators(res.data);
      dispatch(addOperators(res.data));
    };
    getOperators();
  }, []);

  useEffect(() => {
    let common = [];
    for (let i = 0; i < operators.length; i++) {
      for (let j = 0; j < onlineOperators.length; j++) {
        if (operators[i]._id === onlineOperators[j].userId) {
          common.push(operators[i]);
        }
      }
    }
    setOnline(common);
    setOffline(operators.filter((n) => !common.includes(n)));
  }, [onlineOperators, operators]);

  useEffect(() => {
    if (online.length !== 0) {
      dispatch(addOnlineOperators(online));
    }
  }, [online]);

  return (
    <div className="chatOnline">
      {online.map((o) => (
        <div key={o._id} className="chatOnlineFriend">
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
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
      {offline.map((o) => (
        <div key={o._id} className="chatOnlineFriend">
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                "https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              }
              alt=""
            />
            <div className="chatOfflineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  );
};

export default Operators;
