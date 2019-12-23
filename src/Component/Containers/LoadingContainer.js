import React from "react";
import { BeatLoader } from "react-spinners";

const styles = {
  spinner: {
    display: "block"
  }
};

const LoadingContainer = ({ label }) => {
  return (
    <div className="center">
      {label && <span>{label}</span>}
      <BeatLoader css={{ ...styles.spinner }} sizeUnit={"px"} size={25} color={"#9B9B9B"} loading={true} />
    </div>
  );
};

export default LoadingContainer;
