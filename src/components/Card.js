import React from "react";

const Card = (props) => {
  return (
    <div className={`card-item ${props?.type}`}>
      <p className="message">{props?.data?.message}</p>
      <p
        className="clear"
        onClick={() => props.handleClear(props?.id, props?.data)}
      >
        clear
      </p>
    </div>
  );
};

export default Card;
