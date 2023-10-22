import React, { useContext, useState } from "react";
import Attach from "../Assets/attach.png";
import Picture from "../Assets/img.png";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { db, storage } from "../Firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export default function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
  
      uploadTask.on("state_changed", {
        // next: (snapshot) => {
        //   const progress =
        //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //   console.log("Upload is " + progress + "% done");
        //   switch (snapshot.state) {
        //     case "paused":
        //       console.log("Upload is paused");
        //       break;
        //     case "running":
        //       console.log("Upload is running");
        //       break;
        //   }
        // },
        // error: (error) => {
        //   console.error("Error during upload:", error);
        // },
        complete: () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadURL) => {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
            });
        },
      });
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(), // we can't use serverTimeStamp inside arrayUnion
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"] :{
        text
      },
      [data.chatId + ".date"] : serverTimestamp(),
    })
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"] :{
        text
      },
      [data.chatId + ".date"] : serverTimestamp(),
    })

    setText("")
    setImg(null)
  };
  

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something here..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={e => {
          e.key === 'Enter' && handleSend()
        }}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
          
        />
        <label htmlFor="file">
          <img src={Picture} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
