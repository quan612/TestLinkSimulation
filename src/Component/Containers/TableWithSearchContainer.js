import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalYesNo from "../Common/ModalYesNo";
import { Button, Card, CardHeader, CardBody, Input, InputGroup, Container, Row, Col, Table } from "reactstrap";
import LoadingContainer from "./LoadingContainer";
var he = require("he");

const TableWithSearchContainer = ({ isLoading, title, tableItems, columns, handleOnAdd, handleOnDelete }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({});
  const [searchValue, setSearchValue] = useState("");

  const handleOnSearch = e => setSearchValue(e.target.value);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleDeleteFromModal = () => {
    handleOnDelete(itemToDelete);
    setModalOpen(false);
    setItemToDelete({});
  };

  const handleDeleteItem = item => {
    setItemToDelete(item);
    setModalOpen(true);
  };

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
    <Container className="h-75">
      <Row className="h-100">
        <Col className="offset-lg-0 offset-md-3">
          <Card className="card-management h-100">
            <CardHeader>
              {title && <h4>{title}</h4>}
              <br />
              {/* search and create section  */}
              <div className="form-group d-flex">
                <InputGroup className="w-50">
                  <Input type="text" onChange={e => handleOnSearch(e)} placeholder="Search Item" />
                </InputGroup>
                <Button className="btn btn-info ml-3" color="primary" size="sm" onClick={() => handleOnAdd()}>
                  Create
                </Button>
              </div>
              {/* end create section  */}
            </CardHeader>
            <CardBody>
              <Row>
                <Col className="mt-5 col-12">
                  {isLoading ? (
                    <LoadingContainer label={"Fetching Table Data"} />
                  ) : (
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
                        {tableItems && Object.keys(tableItems).length > 0
                          ? tableItems
                              .filter(value => value.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)
                              .map(item => {
                                return (
                                  <tr className="d-flex" key={item.id}>
                                    {Object.keys(columns).map(key => handleRenderTableItems(item, key))}
                                  </tr>
                                );
                              })
                          : null}
                      </tbody>
                    </Table>
                  )}
                </Col>
              </Row>
            </CardBody>
            <ModalYesNo
              title="Confirm to delete item"
              message={`Would you like to delete item: "${itemToDelete.name}"?`}
              isModalOpen={isModalOpen}
              onSubmit={handleDeleteFromModal}
              onClose={handleCloseModal}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TableWithSearchContainer;
