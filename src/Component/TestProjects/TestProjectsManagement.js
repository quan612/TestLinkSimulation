import React, { useState, useEffect } from "react";
import { TableWithModal } from "../Containers/TableWithModal";
import withPagination from "../HOC/withPagination";
import WithLoading from "../HOC/withLoading";
import { TableManagementStyles } from "../styles/TableManagementStyles";
import { Button, Card, CardHeader, CardBody, Input, InputGroup, Container, Row, Col } from "reactstrap";

const TestProjectsWithPaginated = withPagination(TableWithModal);
const TestProjectsWithLoadingWithPaginated = WithLoading(TestProjectsWithPaginated);

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

export const TestProjectsManagement = ({ isProjectLoading, listOfItems, handleOnAdd, handleOnDelete }) => {
  const [searchItems, setSearchItems] = useState([]);

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
        <h4>Test Projects Management</h4>
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

        <TestProjectsWithLoadingWithPaginated
          isLoading={isProjectLoading}
          listOfItems={searchItems}
          handleOnDelete={handleOnDelete}
          columns={COLUMNS}
        />
      </div>
    </TableManagementStyles>
  );
};
