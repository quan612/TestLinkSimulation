import React, { useState } from "react";
import ModalYesNo from "../Common/ModalYesNo";
import { Button, Card, CardHeader, CardBody, Input, InputGroup, Container, Row, Col } from "reactstrap";

import { TableContainerWithLoading } from "../Common/TableContainers";

export const TableWithSearchWithLoading = ({ isLoading, title, tableItems, columns, handleOnAdd, handleOnDelete }) => {
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
                <Col className="mt-3 col-12">
                  <TableContainerWithLoading
                    isLoading={isLoading}
                    loadingLabel={"Fetching table data"}
                    searchValue={searchValue}
                    tableItems={tableItems}
                    columns={columns}
                    handleDeleteItem={handleDeleteItem}
                  />
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
