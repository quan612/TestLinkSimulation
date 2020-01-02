import React from "react";
import styled from "styled-components";

const LeftPane = styled.div`
  width: 30%;
  display: flex;
  flexd-direction: column;
`;

const RightPane = styled.div`
  width: 70%;
  margin-left: auto;
`;

export const SplitPane = props => {
  return (
    <div className="workBody">
      <LeftPane>{props.left}</LeftPane>
      <RightPane>{props.right}</RightPane>
    </div>
  );
};

// export const SplitPane = props => {
//   return (
//     <div className="workBody">
//       <div className="ListContainer d-flex flex-column">{props.left}</div>
//       <div className="testItemWrapper h_100">{props.right}</div>
//     </div>
//   );
// };
