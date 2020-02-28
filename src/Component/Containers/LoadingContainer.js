import React from "react";
import styled from "styled-components";
import { BeatLoader } from "react-spinners";

const StyleLoading = styled.div`
  max-width: 400px;
  min-width: 150px;
  position: absolute;
  top: 50%;
  left: 45%;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingContainer = ({ label, color = "#3A3A3A" }) => {
  return (
    <StyleLoading>
      {label && <span style={{ color: color }}>{label}</span>}
      <BeatLoader sizeUnit={"px"} size={25} color={"#3A3A3A"} loading={true} />
    </StyleLoading>
  );
};

export default LoadingContainer;
