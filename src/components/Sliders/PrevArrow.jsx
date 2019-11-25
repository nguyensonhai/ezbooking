import React from "react";
import "./ArrowStyle.css";

const PrevArrow = props => {
  const { className, style, onClick } = props;
  const arrowStyle = {
    ...style,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    border: "2px solid #9c9c9c24",
    zIndex: 1
  };
  return (
    <div className={className} style={arrowStyle} onClick={onClick}>
      <i
        className='fas fa-angle-left'
        style={{ color: "#9c9c9c5e", fontSize: "20px" }}
      ></i>
    </div>
  );
};

export default PrevArrow;
