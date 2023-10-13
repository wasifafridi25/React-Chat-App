import React from 'react'

export default function Message() {
  return (
    <div className='message owner'>
      <div className="message__info">
        <img src="https://images.pexels.com/photos/1816654/pexels-photo-1816654.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        <span>Just now</span>
      </div>
      <div className="message__content">
        <p>Hello, how's everything going?</p>
        <img src="https://images.pexels.com/photos/1816654/pexels-photo-1816654.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
      </div>
    </div>
  )
}