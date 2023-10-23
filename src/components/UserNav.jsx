import React from "react";
import { Link } from "react-router-dom";
import Back from "../Assets/back.png";


export default function UserNav({ title }) {
  return (
    <div className="friends__nav">
      <div className="friends__nav--left">
        <Link to={"/"}>
          <img src={Back} alt="" className="back__img" />
        </Link>
        <Link to={"/"} className="back__link">
          <h1>Go Back</h1>
        </Link>
      </div>
      <h1 className="friends__nav--heading">{title}</h1>
    </div>
  );
}
