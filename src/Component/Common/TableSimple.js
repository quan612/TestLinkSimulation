import React from "react";
import { Table } from "reactstrap";
import { TableStyles } from "../../Component/styles/TableStyles";

var he = require("he");

const TableSimple = ({ tableItems, columns }) => {
  const handleRenderTableItems = (item, key) => {
    if (key === "step_number") {
      return (
        <td key={key} style={{ width: columns[key].width }}>
          {item[key]}
        </td>
      );
    }
    if (key === "actions" || key === "expected_results") {
      return (
        <td
          key={key}
          style={{ width: columns[key].width }}
          dangerouslySetInnerHTML={{ __html: he.decode(item[key]) }}
        ></td>
      );
    } else {
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
          {tableItems ? (
            tableItems.map(item => (
              <tr className="d-flex" key={item.id}>
                {Object.keys(columns).map(key => handleRenderTableItems(item, key))}
              </tr>
            ))
          ) : (
            <tr></tr>
          )}
        </tbody>
      </Table>
    </TableStyles>
  );
};

export default TableSimple;
