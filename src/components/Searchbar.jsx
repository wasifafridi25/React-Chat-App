import React, { useContext, useState } from "react";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../Firebase.js";
import { AuthContext } from "../context/AuthContext.js";

export default function Searchbar() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext)

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setUser(doc.data());
        console.log(doc.id, " => ", doc.data());
      });
    } catch (err) {
      setErr(true);
      console.log(err)
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
    try{
    const res = await getDoc(doc(db, "chats", combinedId))
    
    if (!res.exists()) {
    // create chats collection between two users if not already there
      await setDoc(doc(db, "chats", combinedId), {messages : []})
    }
    //userChats on the left side the number of friends the user has
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      //nested objects
      [combinedId + ".userInfo"] : {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
      [combinedId + ".date"] : serverTimestamp(),
    })

    await updateDoc(doc(db, "userChats", user.uid), {
      //nested objects
      [combinedId + ".userInfo"] : {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      },
      [combinedId + ".date"] : serverTimestamp(),
    })
    }catch(err){
      console.log(err)
    }
    setUser(null)
    setUsername("")
  }

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Find a user"
        className="searchbar__input"
        onKeyDown={handleKey}
        onChange={(e) => setUsername(e.target.value)}
        //asynchronous function takes time so to immediately do setUsername("") we need to bind the value
        value={username}
      />
      {err && 
      <div className="user__chat">
        <span>User not found</span>
        </div>
        }
      {user && (
        <div className="user__chat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="user__chat--info">
            <span className="searchbar__span">{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}
