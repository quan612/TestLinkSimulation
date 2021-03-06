import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Span from "./Span";

const styles = {
  item: {
    pass: { backgroundColor: "rgb(45, 154, 45)" },
    fail: { backgroundColor: "rgb(195, 71, 71)" },
    block: { backgroundColor: "rgb(54, 154, 172)" },
    noresult: { backgroundColor: "transparent" }
  },
  folder: {}
};

export const TreeLeaf = ({ child, node, onClick }) => {
  const [toggle, setToggle] = useState(false);

  const onToggle = () => {
    setToggle(!toggle);
  };

  const getItemStyle = status => {
    switch (status) {
      case "p":
        return styles.item.pass;
      case "f":
        return styles.item.fail;
      case "b":
        return styles.item.block;
      case "not run":
        return styles.item.noresult;
      default:
        return styles.item.noresult;
    }
  };

  const handleRenderItem = () => {
    if (node === "File") {
      return (
        <div className="tree-text mt-1">
          <FontAwesomeIcon className="d-inline-block mx-1" icon="file-alt" style={{ color: "#99CCFF" }} />
          <Span
            text={
              child.data.full_external_id ? child.data.full_external_id + ":" + child.data.tcase_name : child.data.name
            }
            onClick={() => onClick(child.data)}
            style={getItemStyle(child.data.status)}
          />
        </div>
      );
    } else {
      return (
        <div className="tree-text mt-1">
          <FontAwesomeIcon icon={toggle ? "angle-double-down" : "angle-right"} onClick={() => onToggle()} />
          {toggle ? (
            <FontAwesomeIcon className="d-inline-block mx-1" icon="folder-open" style={{ color: "#CCCC00" }} />
          ) : (
            <FontAwesomeIcon className="d-inline-block mx-1" icon="folder" style={{ color: "#CCCC00" }} />
          )}

          <Span text={child.data.name} onClick={() => onClick(child.data)} />
        </div>
      );
    }
  };

  const renderChildren = () => {
    let children = child.children;
    children = children ? children : [];

    return (
      <ul className="sub-suite mx-1">
        {children.map((child, key) => (
          <li className="ml-3" key={key}>
            <TreeLeaf child={child} key={child.data.id} node={child.data.node} onClick={item => onClick(item)} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <React.Fragment>
      {handleRenderItem()}
      {toggle && renderChildren()}
    </React.Fragment>
  );
};
