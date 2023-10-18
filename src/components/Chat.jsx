import React, { useContext } from 'react'
import Cam from '../Assets/cam.png'
import Add from '../Assets/add.png'
import More from '../Assets/more.png'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'

export default function Chat() {
  const { data } = useContext(ChatContext)

  return (
    <div className='chat'>
      <div className="chat__info">
        <span>{data.user?.displayName}</span>
        <div className="chat__icons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}
