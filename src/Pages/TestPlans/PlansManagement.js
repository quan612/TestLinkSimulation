import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import withPagination from "../../Component/HOC/withPagination";
import WithLoading from "../../Component/HOC/withLoading";
import { TableWithModal } from "../../Component/Containers/TableWithModal";
import { Button, Input, InputGroup } from "reactstrap";
import { TableStyles } from "../../Component/styles/TableStyles";

const TableWithPagination = withPagination(TableWithModal);
const TableWithLoadingWithPagination = WithLoading(TableWithPagination);

const COLUMNS = {
  name: {
    label: "Name",
    width: "30%"
  },
  notes: {
    label: "Description",
    width: "40%"
  },
  testcases: {
    label: "TestCase#",
    width: "7%"
  },
  builds: {
    label: "Build#",
    width: "9%"
  },

  active: {
    label: "Active",
    width: "5%"
  },
  is_public: {
    label: "Public",
    width: "5%"
  },
  Utils: {
    label: "Utils",
    width: "5%"
  }
};

const PlansManagement = ({ selectedProject, isTestPlanLoading, listOfItems, handleOnAdd, handleOnDelete }) => {
  const [searchItems, setSearchItems] = useState([]);

  let history = useHistory();

  useEffect(() => {
    if (listOfItems instanceof Array && listOfItems.length > 0) {
      setSearchItems(listOfItems);
    } else setSearchItems([]);
  }, [listOfItems]);

  const handleOnSearch = e => {
    let items = listOfItems.filter(value => value.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1);
    setSearchItems([...items]);
  };

  return (
    <TableStyles>
      <div className="body">
        {selectedProject && <h4>Test Plans Management - Project {selectedProject.name}</h4>}
        <br />
        {/* search and create section  */}
        <div className="form-group d-flex">
          <InputGroup className="w-50">
            <Input type="text" onChange={e => handleOnSearch(e)} placeholder="Search Item" />
          </InputGroup>
          <Button className="btn btn-info ml-3" color="primary" size="sm" onClick={() => history.push("/addPlan")}>
            Create
          </Button>
        </div>
        {/* end create section  */}

        <TableWithLoadingWithPagination
          isLoading={isTestPlanLoading}
          loadingLabel={"Fetching Test Plans"}
          listOfItems={searchItems}
          handleOnDelete={handleOnDelete}
          columns={COLUMNS}
        />
      </div>
    </TableStyles>
  );
};

export default PlansManagement;
