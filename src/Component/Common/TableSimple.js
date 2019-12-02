import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalYesNo from "../ModalYesNo";
import { BeatLoader } from "react-spinners";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  CustomInput,
  Table
} from "reactstrap";

const TableSimple = ({ tableItems, columns }) => {
  const handleRenderTableItems = (item, key) => {
    // console.log(key, item[key]);
    if (key === "actions" || key === "expected_results") {
      return <td key={key} style={{ width: columns[key].width }} dangerouslySetInnerHTML={{ __html: item[key] }}></td>;
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
        {tableItems
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
  );
};

export default TableSimple;
