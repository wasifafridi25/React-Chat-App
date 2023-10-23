import React, { useContext, useEffect, useRef, useState } from 'react'
import UserNav from '../components/UserNav';
import { AuthContext } from '../context/AuthContext';
import { db, storage } from '../Firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';



export default function Profile() {
  const { currentUser } = useContext(AuthContext)  
  const fileInputRef = useRef(null);
  const [imageUpdated, setImageUpdated] = useState(false);

  const handleImageUpload = () => {
    // Trigger the file input click event to open the file dialog
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
  
    try {
      // Upload the new image to Firebase Storage
      const storageRef = ref(storage, `images/${currentUser.uid}.jpg`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        "state_changed",
        (error) => {
          console.error("Error during upload:", error);
        },
        
        setTimeout(() => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadURL) => {
              // Update the user's photoURL in Firebase Authentication
              await updateProfile(currentUser, { photoURL: downloadURL });
  
              // Update the user's profile picture URL in Firestore in the "users" collection
              await updateDoc(doc(db, 'users', currentUser.uid), {
                photoURL: downloadURL,
              });
  
            //   Update the user's profile picture URL in the "chats" collection
              const userChatsQuery = query(collection(db, 'userChats'), where(currentUser.uid, '==', true));
              const userChatsSnapshot = await getDocs(userChatsQuery);
  
              userChatsSnapshot.forEach(async (doc) => {
                const friendUID = doc.id;
                const combinedId = currentUser.uid > friendUID ? `${currentUser.uid}${friendUID}` : `${friendUID}${currentUser.uid}`;
                const chatDocRef = doc(db, 'chats', combinedId);
  
                // Update the friend's profile picture URL in the chat record
                await updateDoc(chatDocRef, {
                  [`messages.${combinedId}.userInfo.photoURL`]: downloadURL,
                });
              });

              setImageUpdated(prevValue => !prevValue)

            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
            });
        }, 1000)
      );
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    
  }, [imageUpdated])
  

  return (
    <div className="home">
      <div className="container">
        <div className="friends__container">
          <UserNav title={'User Profile'}/>
          <div className="user__profile">
            <div className="user__profile--left">
                <img src={currentUser.photoURL} alt="" className="user__profile--img" onClick={handleImageUpload}/>
                <input type="file" style={{display: 'none'}} onChange={handleFileChange} ref={fileInputRef} />
                <p className="upload__img">Upload Picture</p>
            </div>
            <div className="user__profile--right">
                <h1 className="username">Username: {currentUser.displayName}</h1>
                <h2 className="email">Email: {currentUser.email}</h2>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

