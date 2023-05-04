import styled from "styled-components";

const uri = process.env.REACT_APP_URI;

export const Section = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: none;
  background-color: #29292b;
  background-image: url(${uri + "/img/header-bg.jpg"});
  background-size: cover;
  background-position: center center;
  overflow-x: hidden;
  > div {
    margin-top: 4.5em;
    margin-bottom: 1em;
    padding: 3rem 0;
  }
  @media screen and (min-width: 768px) {
    > div {
      margin-top: 4.5em;
      margin-bottom: 3.5em;
    }
  }

  @media screen and (min-width: 992px) {
    > div {
      margin-top: 6.5em;
      margin-bottom: 3.5em;
    }
  }
`;
