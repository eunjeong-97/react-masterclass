import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import { FAVICON_URL } from "../modules/api";
import { Container, Title, Line } from "../components/Common";

const Tab = styled(Title)`
  margin-bottom: 10px;
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

function Main() {
  return (
    <Container>
      <Helmet>
        <link rel="icon" href={FAVICON_URL} />
        <title>React Project</title>
      </Helmet>
      <Title>React Project</Title>
      <Line top={10} bottom={10} />

      <Link to="/coins">
        <Tab size={30}>CRYPTO TICKER</Tab>
      </Link>

      <Link to="/todos">
        <Tab size={30}>To Do List</Tab>
      </Link>
    </Container>
  );
}

export default Main;
