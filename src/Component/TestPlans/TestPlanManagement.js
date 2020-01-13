import React, { useState, useEffect } from "react";
import { TableWithModal } from "../Containers/TableWithModal";
import withPagination from "../HOC/withPagination";
import WithLoading from "../HOC/withLoading";
import { Button, Card, CardHeader, CardBody, Input, InputGroup, Container, Row, Col } from "reactstrap";

const TestPlansWithPaginated = withPagination(TableWithModal);
const TestPlansWithLoadingWithPaginated = WithLoading(TestPlansWithPaginated);

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

const TestPlanManagement = ({ selectedProject, isTestPlanLoading, listOfItems, handleOnAdd, handleOnDelete }) => {
  const [searchItems, setSearchItems] = useState([]);

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
    <Container className="h-75">
      <Row className="h-100">
        <Col className="offset-lg-0 offset-md-3">
          <Card className="card-management h-100">
            <CardHeader>
              {selectedProject && <h4>Test Plans Management - Project {selectedProject.name}</h4>}
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

            <TestPlansWithLoadingWithPaginated
              isLoading={isTestPlanLoading}
              listOfItems={searchItems}
              handleOnDelete={handleOnDelete}
              columns={COLUMNS}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TestPlanManagement;
