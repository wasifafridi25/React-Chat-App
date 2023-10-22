import React, { useContext, useEffect, useState } from "react";
import Back from "../Assets/back.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
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

      const users = querySnapshot.docs
        .map((doc) => doc.data())
        .filter((user) => !friendUIDs.includes(user.uid));

      setFriends(users);
    } catch (err) {}
  };

  useEffect(() => {
    loadUsers();
  }, [currentUser.uid, friends]);

  const addFriend = async (f) => {
    const combinedId =
      currentUser.uid > f.uid
        ? currentUser.uid + f.uid
        : f.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        // create chats collection between two users if not already there
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
      }

      const userChatsDocRef = doc(db, "userChats", currentUser.uid);

      if (!(await getDoc(userChatsDocRef)).exists()) {
        // Create the userChats document if it doesn't exist
        await setDoc(userChatsDocRef, {});
      }

      //add friend to the userChats collection
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: f.uid,
          displayName: f.displayName,
          photoURL: f.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    } catch (err) {}

    //remove it from the add friends list
    setFriends((prevFriends) =>
      prevFriends.filter((user) => user.uid !== f.uid)
    );
  };

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
                <button
                  className="friend__add--btn"
                  onClick={() => addFriend(friend)}
                >
                  Add +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
