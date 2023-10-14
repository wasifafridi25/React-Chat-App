import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../Firebase'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <span className="logo navbar__logo">BSW Chat</span>
      <div className="navbar__user">
        <img src={currentUser.photoURL} alt="" className="navbar__user--img" />
        <span className="navbar__user--name">{currentUser.displayName}</span>
        <button className="navbar__user--btn" onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}
