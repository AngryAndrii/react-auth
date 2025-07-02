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

  .page-link.underform {
    color: #839a82;
    text-decoration: underline;
    padding: 0 5px;
  }

  .page-link:visited.underform {
    color: rgb(135, 181, 134);
    text-decoration: underline;
    padding: 0 5px;
  }

  .active {
    text-decoration: underline;
    font-weight: 600;
  }
  /* padding: 0; */
`;

export default StyledLayout;
