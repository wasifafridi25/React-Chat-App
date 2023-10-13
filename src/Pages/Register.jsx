import React, { useState } from "react";
import AddAvatar from "../Assets/addAvatar.jpg";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [err, setError] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault(); // to prevent refresh of the page on submit
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const files = e.target[3].files[0];

    try {
      //authenticate and register the user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res.user);

      // store the avatar image on the storage
      const storageRef = ref(storage, `images/${displayName}.jpg`);

      const uploadTask = uploadBytesResumable(storageRef, files);

      uploadTask.on(
        
        (error) => {
          setError(true)
        },
        setTimeout(() => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
           
            })
            // add user to the firestore db
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid, // so when we fetch the data we can just say user.uid
              displayName,
              email,
              photoURL: downloadURL,
            })

            await setDoc(doc(db, "userChats", res.user.uid), {})
            
            navigate("/");
          });
        }, 3000)
      );

      
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="form__container">
      <div className="form__wrapper">
        <span className="logo">BSW Chat App</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={AddAvatar} className="avatar__img" alt="" />
            <span>Add an avatar</span>
          </label>
          <button className="signup">Sign Up</button>
          {err && <span className="error">Something went wrong</span>}
        </form>
        <p>Already have an account? <Link to={"/login"}>Login</Link></p>
      </div>
    </div>
  );
}
