import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export default function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({behavior: "smooth"});
  }, [message]);

  const formatDate = (timestamp) => {
    const now = new Date();
    const messageDate = timestamp.toDate();
    const diff = now - messageDate;

    if (diff < 60000) {
      return "Just now";
    } else if (diff < 3600000) {
      return `${Math.floor(diff / 60000)}m ago`;
    } else if (diff < 86400000) {
      return `${Math.floor(diff / 3600000)}h ago`;
    } else {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return messageDate.toLocaleDateString("en-US", options);
    }
  };

  return (
    <div
      ref={ref}
      className={`message ${currentUser.uid === message.senderId && "owner"}`}
    >
      <div className="message__info">
        <img
          src={
            currentUser.uid === message.senderId
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>{formatDate(message.date)}</span>
      </div>
      <div className="message__content">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
}
