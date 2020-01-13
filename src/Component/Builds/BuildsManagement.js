import React, { useState, useEffect } from "react";
import { TableWithModal } from "../Containers/TableWithModal";
import withPagination from "../HOC/withPagination";
import WithLoading from "../HOC/withLoading";
import { Button, Card, CardHeader, CardBody, Input, InputGroup, Container, Row, Col } from "reactstrap";

const BuildsWithPaginated = withPagination(TableWithModal);
const BuildsWithLoadingWithPaginated = WithLoading(BuildsWithPaginated);

const COLUMNS = {
  name: {
    label: "Name",
    width: "30%"
  },
  notes: {
    label: "Description",
    width: "45%"
  },
  release_date: {
    label: "Release Date",
    width: "10%"
  },
  active: {
    label: "Active",
    width: "5%"
  },
  is_open: {
    label: "Open",
    width: "5%"
  },
  Utils: {
    label: "Utils",
    width: "5%"
  }
};

const BuildsManagement = ({ isLoading, selectedTestPlan, listOfItems, handleOnAdd, handleOnDelete }) => {
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
              {selectedTestPlan && <h4>Builds Management - Plan: {selectedTestPlan.name}</h4>}
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

            <BuildsWithLoadingWithPaginated
              isLoading={isLoading}
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

export default BuildsManagement;
