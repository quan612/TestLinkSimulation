import React from "react";
import { CircleLoader } from "react-spinners";

const WithLoading = Component => {
  const styles = {
    spinner: {
      display: "block",
      margin: "0 auto",
      horizontalAlign: "center"
    }
  };

  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading === true) {
      return (
        <CircleLoader css={{ ...styles.spinner }} sizeUnit={"px"} size={40} color={"#0061D4"} loading={isLoading} />
      );
    } else {
      return <Component {...props} />;
    }
  };
};
export default WithLoading;
