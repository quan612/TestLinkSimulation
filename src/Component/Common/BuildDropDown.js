import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import withBuildsFetching from "../HOC/withBuildsFetching";
import DropDown from "./DropDown";
import DropdownStyles from "../styles/DropdownStyles";
import styled from "styled-components";
import { selectBuildAction } from "../../Redux/build.action";

const Label = styled.label`
  color: ${props => props.theme.grey};
  font-weight: 600;
  font-size: 0.8rem;
  margin: 0 !important;
  margin-right: 2px;
`;

export const BuildDropDown = ({ isLoading, buildsOfCurrentTestPlan }) => {
  const [selectedItem, setSelectedItem] = useState({ name: "" });
  let dispatch = useDispatch();

  useEffect(() => {
    if (buildsOfCurrentTestPlan.length > 0) {
      setSelectedItem(buildsOfCurrentTestPlan[0]);
      dispatch(selectBuildAction(buildsOfCurrentTestPlan[0]));
    } else {
      setSelectedItem({ name: "There is no build" });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildsOfCurrentTestPlan]);

  const handleOnChangeBuild = eventKey => {
    setSelectedItem(buildsOfCurrentTestPlan[eventKey]);
    dispatch(selectBuildAction(buildsOfCurrentTestPlan[eventKey]));
  };

  return (
    <div className="d-flex align-items-center justify-content-between">
      <Label>Build: </Label>
      {
        <DropdownStyles>
          <DropDown
            title={isLoading || buildsOfCurrentTestPlan === [] ? "Fetching Builds..." : selectedItem.name}
            items={buildsOfCurrentTestPlan}
            onSelect={handleOnChangeBuild}
          />
        </DropdownStyles>
      }
    </div>
  );
};

const BuildDropDownWithFetching = withBuildsFetching(BuildDropDown);
export default BuildDropDownWithFetching;
