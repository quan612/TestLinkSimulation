import React from "react";
import Modal from "react-responsive-modal";

const ModalYesNo = ({ isModalOpen, onSubmit, onClose, title, message }) => {
  return (
    <Modal open={isModalOpen} onClose={onClose} center>
      <h5 className="modal-title" id="exampleModalLongTitle">
        {title}
      </h5>
      <div className="modal-body">
        <p>{message}</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          No
        </button>
        <button type="button" className="btn btn-danger" onClick={() => onSubmit()}>
          Yes
        </button>
      </div>
    </Modal>
  );
};

export default ModalYesNo;
