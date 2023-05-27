import React from "react";

function Item({ text, img }) {
  return (
    <a className="item">
      <img src={img} />
      <label>{text}</label>{" "}
    </a>
  );
}

export default Item;
