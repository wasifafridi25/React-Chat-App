import React from 'react'
import Attach from '../Assets/attach.png'
import Picture from '../Assets/img.png'

export default function Input() {
  return (
    <div className='input'>
      <input type="text" placeholder='Type something here...'/>
      <div className="send">
        <img src={Attach} alt="" />
        <input type="file" style={{display:"none"}} id='file'/>
        <label htmlFor="file">
          <img src={Picture} alt="" />
        </label>
        <button>Send</button>
      </div>
    </div>
  )
}
