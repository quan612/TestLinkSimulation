import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useBuildsFetching from "../../Component/CustomHooks/useBuildsFetching";

import withPagination from "../../Component/HOC/withPagination";
import WithLoading from "../../Component/HOC/withLoading";
import { TableWithModal } from "../../Component/Containers/TableWithModal";
import { Button, Input } from "reactstrap";

const BuildsWithPaginated = withPagination(TableWithModal);
const BuildsWithLoadingWithPaginated = WithLoading(BuildsWithPaginated);

const COLUMNS = {
  name: {
    label: "Name",
    width: "30%"
  },
  notes: {
    label: "Description",
    width: "35%"
  },
  release_date: {
    label: "Release Date",
    width: "13%"
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

const BuildsManagement = ({ selectedTestPlan, handleOnDelete }) => {
  const { isLoading, buildsOfCurrentTestPlan } = useBuildsFetching(selectedTestPlan);
  const [searchItems, setSearchItems] = useState([]);
  let history = useHistory();

  useEffect(() => {
    if (buildsOfCurrentTestPlan instanceof Array && buildsOfCurrentTestPlan.length > 0) {
      setSearchItems(buildsOfCurrentTestPlan);
    } else setSearchItems([]);
  }, [buildsOfCurrentTestPlan]);

  const handleOnSearch = e => {
    let items = buildsOfCurrentTestPlan.filter(
      value => value.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
    );
    setSearchItems([...items]);
  };

  return (
    <div className="body">
      {selectedTestPlan && <h4>Builds Management - Plan: {selectedTestPlan.name}</h4>}
      <br />

      <div className="form-group d-flex">
        <div className="w-50">
          <Input type="text" onChange={e => handleOnSearch(e)} placeholder="Search Builds" />
        </div>
        <Button className="btn btn-info ml-3" color="primary" size="sm" onClick={() => history.push("/addBuild")}>
          Create Build
        </Button>
      </div>

      <BuildsWithLoadingWithPaginated
        isLoading={isLoading}
        loadingLabel={"Fetching Builds"}
        listOfItems={searchItems}
        handleOnDelete={handleOnDelete}
        columns={COLUMNS}
      />
    </div>
  );
};

export default BuildsManagement;
