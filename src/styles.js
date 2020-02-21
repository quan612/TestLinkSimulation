import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-content: center;

  @media (min-width: 576px) {
    max-width: 540px;
    /* display: block; */
  }

  @media (min-width: 768px) {
    max-width: 720px;
    display: flex;
  }
  @media (min-width: 992px) {
    max-width: 960px;
    display: flex;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
    display: flex;
  }
`;

export const HeaderContainer = styled.div`
  flex: 0 1 auto;
`;

export const BodyContainer = styled.div`
  display: flex;
  /* flex-flow: row wrap; */
  width: 100%;
  flex: 1 1 auto;
  margin-right: auto;
  margin-left: auto;

  /* background: red; */

  @media (max-width: 960px) {
    display: flex;
    display: block;
    flex-direction: column;
    flex: 0;
    /* width: 100%; */
  }
`;
