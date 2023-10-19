import React, { useContext } from "react";
import Cam from "../Assets/cam.png";
import Add from "../Assets/add.png";
import More from "../Assets/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { Link, Navigate } from "react-router-dom";

export default function Chat() {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chat__info">
        <span>{data.user?.displayName}</span>
        <div className="chat__icons">
          <img src={Cam} alt="" />
          <Link to={"/add_friend"}>
            <img src={Add} alt="" />
          </Link>
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}
