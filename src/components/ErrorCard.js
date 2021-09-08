import React from "react";
//components
import Card from "./Card";

const ErrorCard = (props) => {
  return (
    <div className="card-data">
      <h3>{props.message} Type 1</h3>
      <p>Count {props.data.length}</p>
      {props.data.map((obj, id) => (
        <Card
          type={String(props.message).toLowerCase()}
          data={obj}
          key={id.toString()}
          id={id}
          handleClear={props.handleClear}
        />
      ))}
    </div>
  );
};

export default ErrorCard;
