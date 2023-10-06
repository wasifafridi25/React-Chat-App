import React from 'react'
import Navbar from './Navbar'
import Searchbar from './Searchbar'
import Chats from './Chats'

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <Navbar />
      <Searchbar />
      <Chats /> 
      {/* we are having a separate component for chats cause when we submit a message we only want to re-render the Chats
      not the navbar and searchbar */}
    </div>
  )
}
