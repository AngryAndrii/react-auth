import styled from '@emotion/styled';

const StyledLayout = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #2e2e2e;
  .page-link {
    color: black;
    text-decoration: none;
    font-size: 18px;
  }

  .page-link:visited {
    color: black;
  }

  .active {
    text-decoration: underline;
    font-weight: 600;
  }
`;

export default StyledLayout;
