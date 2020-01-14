import React, { useState } from "react";
import ModalYesNo from "../Common/ModalYesNo";

import { TableContainer } from "../Common/TableContainers";

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
      <TableContainer tableItems={listOfItems} columns={columns} handleDeleteItem={handleDeleteItem} />
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
