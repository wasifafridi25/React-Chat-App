import React from 'react'

export default function Searchbar() {
  return (
    <div className='searchbar'>
      <input type="text" placeholder='Find a user' className='searchbar__input'/>
      <div className="user__chat">
        <img src="https://images.pexels.com/photos/1816654/pexels-photo-1816654.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        <div className="user__chat--info">
            <span className='sidebar__span'>Wasif</span>
        </div>
      </div>
    </div>
  )
}
