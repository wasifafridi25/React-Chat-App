import React from 'react'

export default function Navbar() {
  return (
    <div className='navbar'>
      <span className="logo navbar__logo">BSW Chat</span>
      <div className="navbar__user">
        <img src="https://images.pexels.com/photos/1816654/pexels-photo-1816654.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className="navbar__user--img" />
        <span className="navbar__user--name">Wasif</span>
        <button className="navbar__user--btn">Logout</button>
      </div>
    </div>
  )
}
