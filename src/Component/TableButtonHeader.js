import React from "react";

const TableButtonHeader = ({ type = "button", onClick, style, label }) => {
  return (
    <button type={type} className="btn btn-light mr-3" onClick={onClick}>
      {label}
    </button>
  );
};

export default TableButtonHeader;

{
  /* <button type="button" className="btn btn-light" onClick={onCancel}>
          Cancel
        </button> */
}
