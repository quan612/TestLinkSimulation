import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;

  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

export const Card = styled.div`
  background: ${props => props.theme.nav_bg};
  background-image: ${props => props.theme.nav_bgImg};
  border: 0;
  position: relative;
  height: 100%;
  width: 100%;
  box-shadow: 0 1px 20px 0px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  color: ${props => props.theme.black};

  margin-right: auto;
  margin-left: auto;
  padding: 15px;

  h1 {
    font-size: 2rem;
  }

  label {
    margin-bottom: 0.75rem;
    margin: 0 15px;
    color: ${props => props.theme.black};
  }
`;
