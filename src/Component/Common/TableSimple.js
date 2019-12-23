import React from "react";
import { Table } from "reactstrap";
var he = require("he");

const TableSimple = ({ tableItems, columns }) => {
  const handleRenderTableItems = (item, key) => {
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
    <Table>
      <thead className="bg-default">
        <tr className="d-flex">
          {Object.keys(columns).map(key => (
            <th key={key} style={{ width: columns[key].width }}>
              {columns[key].label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableItems &&
          tableItems.map(item => {
            return (
              <tr className="d-flex" key={item.id}>
                {Object.keys(columns).map(key => handleRenderTableItems(item, key))}
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default TableSimple;
