import React from 'react'
import AddAvatar from "../Assets/addAvatar.jpg"

export default function Register() {
  return (
    <div className='form__container'>
      <div className="form__wrapper">
        <span className="logo">BSW Chat App</span>
        <span className="title">Register</span>
        <form>
            <input type="text" placeholder='Display name'/>
            <input type="email" placeholder='email'/>
            <input type="password" placeholder='password'/>
            <input style={{display: "none"}} type="file" id='file'/>
            <label htmlFor="file">
                <img src={AddAvatar} className='avatar__img' alt="" />
                <span>Add an avatar</span>
            </label>
            <button className="signup">Sign Up</button>
        </form>
        <p>Already have an account? Login</p>
      </div>
    </div>
  )
}
