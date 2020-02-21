import React, { useState } from "react";
import { Button, Input, Table } from "reactstrap";
import { TableStyles } from "../../Component/styles/TableStyles";

var he = require("he");

const TableWithCreateItem = ({ tableItems, columns, onSave, onCancel }) => {
  const [stepData, setStepData] = useState({
    step_number: (tableItems.length + 1).toString(),
    actions: "",
    expected_results: "",
    execution_type: 1 //manual
  });

  const handleOnChange = e => {
    const { name, value } = e.target;
    setStepData(prevState => {
      return { ...prevState, [name]: value };
    });
  };
  const index = tableItems.length;

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
          {tableItems ? (
            tableItems.map(item => {
              return (
                <tr className="d-flex" key={item.id}>
                  {Object.keys(columns).map(key => handleRenderTableItems(item, key))}
                </tr>
              );
            })
          ) : (
            <tr></tr>
          )}
          <tr className="d-flex">
            <td style={{ width: "8%" }}>{index + 1}</td>
            <td style={{ width: "47%" }}>
              <Input type="textarea" name="actions" id="example1" onChange={handleOnChange} />
            </td>
            <td style={{ width: "45%" }}>
              <Input type="textarea" name="expected_results" id="example1" onChange={handleOnChange} />
            </td>
          </tr>
        </tbody>
      </Table>
      <Button className="btn btn-info ml-3" color="primary" size="sm" onClick={() => onSave(stepData)}>
        Save
      </Button>{" "}
      <Button className="btn btn-info ml-3" color="primary" size="sm" onClick={onCancel}>
        Cancel
      </Button>
    </TableStyles>
  );
};

export default TableWithCreateItem;
