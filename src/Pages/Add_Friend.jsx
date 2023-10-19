import React from "react";
import Back from "../Assets/back.png";
import Img from "../Assets/jessica.jpg";
import { Link } from "react-router-dom";

export default function Add_Friend() {
  return (
    <div className="home">
      <div className="container">
        <div className="friends__container">
          <div className="friends__nav">
            <div className="friends__nav--left">
              <Link to={"/"}>
                <img src={Back} alt="" className="back__img" />
              </Link>
              <Link to={"/"} className="back__link">
                <h1>Go Back</h1>
              </Link>
            </div>
            <h1 className="friends__nav--heading">Add Friend</h1>
          </div>

          <div className="friends">
            <div className="friend__info">
              <img src={Img} alt="" className="friend__img" />
              <h1 className="friend__name">Jessica</h1>
            </div>
            <button className="friend__add--btn">Add +</button>
          </div>
          <div className="friends">
            <div className="friend__info">
              <img src={Img} alt="" className="friend__img" />
              <h1 className="friend__name">Jessica</h1>
            </div>
            <button className="friend__add--btn">Add +</button>
          </div>
          <div className="friends">
            <div className="friend__info">
              <img src={Img} alt="" className="friend__img" />
              <h1 className="friend__name">Jessica</h1>
            </div>
            <button className="friend__add--btn">Add +</button>
          </div>
          <div className="friends">
            <div className="friend__info">
              <img src={Img} alt="" className="friend__img" />
              <h1 className="friend__name">Jessica</h1>
            </div>
            <button className="friend__add--btn">Add +</button>
          </div>
          <div className="friends">
            <div className="friend__info">
              <img src={Img} alt="" className="friend__img" />
              <h1 className="friend__name">Jessica</h1>
            </div>
            <button className="friend__add--btn">Add +</button>
          </div>
        </div>
      </div>
    </div>
  );
}
