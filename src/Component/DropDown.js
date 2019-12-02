import React from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";

const DropDown = ({ title, items, onSelect }) => {
  return (
    <DropdownButton title={title ? title : ""} onSelect={onSelect}>
      {items ? (
        items.map((value, key) => (
          <Dropdown.Item key={key} eventKey={key}>
            {value.hasOwnProperty("name") ? value.name : value}
          </Dropdown.Item>
        ))
      ) : (
        <Dropdown.Item>{""}</Dropdown.Item>
      )}
    </DropdownButton>
  );
};

export default DropDown;
