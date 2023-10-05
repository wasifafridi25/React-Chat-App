import React from 'react'

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
            <input type="file" />
            <button className="signup">Sign Up</button>
        </form>
        <p>Do not have an account? Login</p>
      </div>
    </div>
  )
}
