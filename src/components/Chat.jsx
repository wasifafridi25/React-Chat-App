import React from 'react'
import Cam from '../Assets/cam.png'
import Add from '../Assets/add.png'
import More from '../Assets/more.png'

export default function Chat() {
  return (
    <div className='chat'>
      <div className="chat__info">
        <span>Wasif</span>
        <div className="chat__icons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
    </div>
  )
}
