import React from "react";

const Span = ({ text, style, onClick }) => {
  return (
    <span style={{ ...style }} onClick={onClick}>
      {text}
    </span>
  );
};

export default Span;
