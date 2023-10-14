import React, { useState } from "react";
import { collection, query, where } from "firebase/firestore";
import { db } from "../Firebase.js";

export default function Searchbar() {
  const search = () => {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

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
      }
    };

    const handleKey = (e) => {
      e.code === "Enter" && handleSearch();
    };
  };
  
  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Find a user"
        className="searchbar__input"
        onKeyDown={handleKey}
        onChange={(e) => setUsername(e.target.value)}
      />
      {user && <div className="user__chat">
        <img
          src={user.photoURL}
          alt=""
        />
        <div className="user__chat--info">
          <span className="searchbar__span">{user.displayName}</span>
        </div>
      </div>}
    </div>
  );
}
