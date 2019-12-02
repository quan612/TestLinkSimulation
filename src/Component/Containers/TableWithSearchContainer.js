import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalYesNo from "../ModalYesNo";
import { BeatLoader } from "react-spinners";
import { Button, Card, CardHeader, CardBody, Input, InputGroup, Container, Row, Col, Table } from "reactstrap";

const styles = {
  spinner: {
    display: "block",
    margin: "0 auto",
    horizontalAlign: "center"
  }
};

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
    if (key === "Utils") {
      return (
        <td key={key} style={{ width: columns[key].width }}>
          <FontAwesomeIcon icon="trash-alt" style={{ color: "red" }} onClick={() => handleDeleteItem(item)} />
        </td>
      );
    } else if (key === "notes") {
      return <td key={key} style={{ width: columns[key].width }} dangerouslySetInnerHTML={{ __html: item.notes }}></td>;
    } else {
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
                      {isLoading ? (
                        <tr>
                          <td>
                            <BeatLoader
                              css={{ ...styles.spinner }}
                              sizeUnit={"px"}
                              size={25}
                              color={"#9B9B9B"}
                              loading={isLoading}
                            />
                          </td>
                        </tr>
                      ) : tableItems && Object.keys(tableItems).length > 0 ? (
                        tableItems
                          .filter(value => value.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)
                          .map(item => {
                            return (
                              <tr className="d-flex" key={item.id}>
                                {Object.keys(columns).map(key => handleRenderTableItems(item, key))}
                              </tr>
                            );
                          })
                      ) : null}
                    </tbody>
                  </Table>
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
