import React, { useContext, useEffect, useState } from "react";
import Back from "../Assets/back.png";
import Img from "../Assets/jessica.jpg";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../Firebase";

export default function Add_Friend() {
  const [friends, setFriends] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const loadUsers = async () => {
    try {
      const userChatsDoc = await getDoc(doc(db, "userChats", currentUser.uid));
      const userChatsData = userChatsDoc.data();
      const friendUIDs = userChatsData
        ? Object.keys(userChatsData).map(
            (combinedId) => userChatsData[combinedId].userInfo.uid
          )
        : [];

      const q = query(
        collection(db, "users"),
        where("uid", "!=", currentUser.uid)
      );

      const querySnapshot = await getDocs(q);

      const users = querySnapshot.docs.map(doc => doc.data()).filter(user => !friendUIDs.includes(user.uid))  
      
      setFriends(users);
    } catch (err) {}
  };

  useEffect(() => {
    loadUsers();
  }, [currentUser.uid]);

  return (
    <div className="home">
      <div className="container">
        <div className="friends__container">
          <div className="friends__nav">
            <div className="friends__nav--left">
              <Link to={"/"}>
                <img src={Back} alt="" className="back__img" />
              </Link>
              <Link to={"/"} className="back__link">
                <h1>Go Back</h1>
              </Link>
            </div>
            <h1 className="friends__nav--heading">Add Friend</h1>
          </div>

          {friends.map((friend) => (
            <div className="friends">
              <div className="friend__info">
                <img src={friend.photoURL} alt="" className="friend__img" />
                <h1 className="friend__name">{friend.displayName}</h1>
              </div>
              <div>
                <button className="friend__add--btn">Add +</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
