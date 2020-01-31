import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import withPagination from "../../Component/HOC/withPagination";
import WithLoading from "../../Component/HOC/withLoading";
import { TableWithModal } from "../../Component/Containers/TableWithModal";
import { TableManagementStyles } from "../../Component/styles/TableManagementStyles";
import { Button, Input, InputGroup } from "reactstrap";

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
  prefix: {
    label: "Prefix",
    width: "7%"
  },
  issue_tracker_enabled: {
    label: "Issue Tracker",
    width: "9%"
  },
  requirementsEnabled: {
    label: "Requirement",
    width: "8%"
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

export const ProjectsManagement = ({ isProjectLoading, listOfItems, handleOnDelete }) => {
  const [searchItems, setSearchItems] = useState([]);
  let history = useHistory();
  useEffect(() => {
    setSearchItems(listOfItems);
  }, [listOfItems]);

  const handleOnSearch = e => {
    let items = listOfItems.filter(value => value.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1);
    setSearchItems([...items]);
  };

  return (
    <TableManagementStyles>
      <div className="body">
        <h4>Projects Management</h4>
        <br />
        {/* search and create section  */}
        <div className="form-group d-flex">
          <InputGroup className="w-50">
            <Input type="text" onChange={e => handleOnSearch(e)} placeholder="Search Item" />
          </InputGroup>
          <Button className="btn btn-info ml-3" color="primary" size="sm" onClick={() => history.push("/addProject")}>
            Create
          </Button>
        </div>
        {/* end create section  */}

        <TableWithLoadingWithPagination
          isLoading={isProjectLoading}
          loadingLabel={"Fetching Test Projects"}
          listOfItems={searchItems}
          handleOnDelete={handleOnDelete}
          columns={COLUMNS}
        />
      </div>
    </TableManagementStyles>
  );
};
