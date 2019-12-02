import React from "react";

const ListHeader = ({ title, handleSearch, handleAdd, buttonText }) => {
  return (
    <div>
      <h1 className="mt-10 title"> {title}</h1>
      <div className="form-group d-flex">
        <input
          type="text"
          //   name="projectSearch"
          className="form-control col-3 mr-3"
          onChange={e => handleSearch(e)}
        />
        <button type="button" className="btn btn-info" onClick={handleAdd}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ListHeader;
