import React from 'react'
import UserNav from '../components/UserNav';
import Img from '../Assets/jessica.jpg'


export default function Profile() {
    

  return (
    <div className="home">
      <div className="container">
        <div className="friends__container">
          <UserNav title={'User Profile'}/>
          <div className="user__profile">
            <div className="user__profile--left">
                <img src={Img} alt="" className="user__profile--img" />
            </div>
            <div className="user__profile--right">
                <h1 className="username">Username: Harry Potter</h1>
                <h2 className="email">Email: waseefafridi39@gmail.com</h2>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

