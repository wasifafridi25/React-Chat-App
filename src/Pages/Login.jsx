import React from 'react'

export default function Login() {
  return (
    <div className='form__container'>
      <div className="form__wrapper">
        <span className="logo">BSW Chat App</span>
        <span className="title">Login</span>
        <form>
            <input type="email" placeholder='email'/>
            <input type="password" placeholder='password'/>
            <button className="signup">Sign In</button>
        </form>
        <p>Don't have an account? Register</p>
      </div>
    </div>
  )
}
