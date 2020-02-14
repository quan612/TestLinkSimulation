import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import withPagination from "../../Component/HOC/withPagination";
import WithLoading from "../../Component/HOC/withLoading";
import { TableWithModal } from "../../Component/Containers/TableWithModal";

import { Container, Card } from "../../Component/styles/BodyStyles";
import { Button, Input } from "reactstrap";

const TableWithPagination = withPagination(TableWithModal);
const TableWithLoadingWithPagination = WithLoading(TableWithPagination);

const COLUMNS = {
  name: {
    label: "Name",
    width: "30%"
  },
  notes: {
    label: "Description",
    width: "35%"
  },
  prefix: {
    label: "Prefix",
    width: "6%"
  },

  requirementsEnabled: {
    label: "Requirement",
    width: "10%"
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
    <Container className="wrapper h-75">
      <Card>
        <h4>Projects Management</h4>
        <div className="form-group d-flex flex-wrap">
          <div className="w-25 min-w-100">
            <Input type="text" onChange={e => handleOnSearch(e)} placeholder="Search Item" />
          </div>
          <Button className="btn btn-info ml-3" color="primary" size="sm" onClick={() => history.push("/addProject")}>
            Add Project
          </Button>
        </div>

        <TableWithLoadingWithPagination
          isLoading={isProjectLoading}
          loadingLabel={"Fetching Test Projects"}
          listOfItems={searchItems}
          handleOnDelete={handleOnDelete}
          columns={COLUMNS}
        />
      </Card>
    </Container>
  );
};
