import React from "react";
import LoadingContainer from "../Containers/LoadingContainer";

const WithLoading = Component => {
  return function WithLoadingComponent({ isLoading, loadingLabel, ...props }) {
    if (isLoading === true) {
      return <LoadingContainer label={loadingLabel} />;
    } else {
      return <Component {...props} />;
    }
  };
};
export default WithLoading;
