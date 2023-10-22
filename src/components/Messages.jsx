import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../Firebase'

export default function Messages() {
  const [messages, setMessages] = useState([])
  const { data } = useContext(ChatContext)

  const [friendSelected, setFriendSelected] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      unsub();
    }
  }, [data.chatId])
  console.log(messages)

  return (
    <div className='messages'>
      {messages.map(m => (
        <Message message={m} key={m.id}/>
      ))}
      
      
    </div>
  )
}
