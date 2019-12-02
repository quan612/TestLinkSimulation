import React from "react";
import PropTypes from "prop-types";

const Span = ({ text, style, onClick }) => {
  return (
    <span style={{ ...style }} onClick={onClick}>
      {text}
    </span>
  );
  //   const style = {
  //     pass: { background: "#D5EED5" },
  //     fail: { background: "#EED5D5" },
  //     block: { background: "#D5D5EE" },
  //     noresult: {}
  //   };
  //   if ((hasStyle !== "p" && hasStyle !== "f" && hasStyle !== "b") || !hasStyle) {
  //     return <span onClick={onClick}>{text}</span>;
  //   }
  //   if (hasStyle === "p") {
  //     return (
  //       <span style={{ ...style.pass }} onClick={onClick}>
  //         {text}
  //       </span>
  //     );
  //   }
  //   if (hasStyle === "f") {
  //     return (
  //       <span style={{ ...style.fail }} onClick={onClick}>
  //         {text}
  //       </span>
  //     );
  //   }
  //   if (hasStyle === "b") {
  //     return (
  //       <span style={{ ...style.block }} onClick={onClick}>
  //         {text}
  //       </span>
  //     );
  //   }
};

// Span.propTypes = {
//   onClick: PropTypes.func,
//   style: PropTypes.object,
//   text: PropTypes.string.isRequired
// };

export default Span;
