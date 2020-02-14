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
    width: "4%"
  },

  Utils: {
    label: "Utils",
    width: "4%"
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
    <Container className="wrapper h-75">
      <Card>
        {selectedProject && <h4>Test Plans Management - Project {selectedProject.name}</h4>}
        <div className="form-group d-flex">
          <div className="w-50">
            <Input type="text" onChange={e => handleOnSearch(e)} placeholder="Search Item" />
          </div>
          <Button className="btn btn-info ml-3" color="primary" size="sm" onClick={() => history.push("/addPlan")}>
            Add Plan
          </Button>
        </div>

        <TableWithLoadingWithPagination
          isLoading={isTestPlanLoading}
          loadingLabel={"Fetching Test Plans"}
          listOfItems={searchItems}
          handleOnDelete={handleOnDelete}
          columns={COLUMNS}
        />
      </Card>
    </Container>
  );
};

export default PlansManagement;
