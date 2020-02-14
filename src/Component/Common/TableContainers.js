import React from "react";
import { Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WithLoading from "../HOC/withLoading";
import { TableStyles } from "../../Component/styles/TableStyles";

var he = require("he");

export const TableContainer = ({ tableItems, columns, handleDeleteItem }) => {
  const handleRenderTableItems = (item, key) => {
    switch (key) {
      case "Utils":
        return (
          <td key={key} style={{ width: columns[key].width }}>
            <FontAwesomeIcon icon="trash-alt" style={{ color: "red" }} onClick={() => handleDeleteItem(item)} />
          </td>
        );

      case "notes":
        return (
          <td
            key={key}
            style={{ width: columns[key].width }}
            dangerouslySetInnerHTML={{ __html: he.decode(item.notes) }}
          ></td>
        );

      case "active":
      case "is_public":
      case "is_open":
        return (
          <td key={key} style={{ width: columns[key].width }}>
            {item[key] === "1" ? (
              <FontAwesomeIcon icon="check-circle" style={{ color: "#5cd55c" }} size={"lg"} />
            ) : null}
          </td>
        );

      case "requirementsEnabled":
        return (
          <td key={key} style={{ width: columns[key].width }}>
            {item.opt[key] === 1 ? (
              <FontAwesomeIcon icon="check-circle" style={{ color: "#5cd55c" }} size={"lg"} />
            ) : null}
          </td>
        );
      default:
        return (
          <td key={key} style={{ width: columns[key].width }}>
            {item[key]}
          </td>
        );
    }
  };
  return (
    <TableStyles>
      <Table>
        <thead>
          <tr className="d-flex">
            {Object.keys(columns).map(key => (
              <th key={key} style={{ width: columns[key].width }}>
                {columns[key].label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableItems && Object.keys(tableItems).length > 0
            ? tableItems.map(item => {
                return (
                  <tr className="d-flex" key={item.id}>
                    {Object.keys(columns).map(key => handleRenderTableItems(item, key))}
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    </TableStyles>
  );
};

export const TableContainerWithLoading = WithLoading(TableContainer);
