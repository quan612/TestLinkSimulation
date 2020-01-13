import React, { useState } from "react";
import ModalYesNo from "../Common/ModalYesNo";
import { Button, Card, CardHeader, CardBody, Input, InputGroup, Container, Row, Col } from "reactstrap";

import { TableContainerWithLoading, TableContainer } from "../Common/TableContainers";

export const TableWithModal = ({ listOfItems, columns, handleOnDelete }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({});

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
    <>
      {/* <CardBody>
        <Row> */}
      {/* <Col className="mt-3 col-12"> */}

      <TableContainer tableItems={listOfItems} columns={columns} handleDeleteItem={handleDeleteItem} />
      {/* </Col> */}
      {/* </Row>
      </CardBody> */}
      <ModalYesNo
        title="Confirm to delete item"
        message={`Would you like to delete item: "${itemToDelete.name}"?`}
        isModalOpen={isModalOpen}
        onSubmit={handleDeleteFromModal}
        onClose={handleCloseModal}
      />
    </>
  );
};
