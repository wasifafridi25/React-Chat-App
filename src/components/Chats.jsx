import React, { useContext, useEffect, useState } from "react";
import { db } from "../Firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import Img from "../Assets/default.jpg";

export default function Chats() {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);
  console.log(Object.entries(chats));

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {chats &&
        Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              className="user__chat"
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              
                <img src={chat[1].userInfo?.photoURL || Img} alt="" />
              
              <div className="user__chat--info2">
                <span className="user__chat--span">
                  {chat[1].userInfo.displayName}
                </span>
                <p>
                  {chat[1].lastMessage?.text.length > 10
                    ? `${chat[1].lastMessage.text.substring(0, 10)}...`
                    : chat[1].lastMessage?.text}
                </p>
              </div>
            </div>
          ))}
    </div>
  );
}
