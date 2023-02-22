import styled from 'styled-components';
import { AnswerEditMain } from '../components/common/EditP/EditP';
import { AnswerNav } from '../components/common/EditP/EditNav';
import Nav from '../components/common/Nav';
import Header from '../components/common/Header/Header';
import Footer from '../components/common/Footer';

const Container = styled.div`
  width: 100%;
`;
const APHeader = styled.div`
  width: 100%;
  height: 54px;
`;
const MainContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1264px;
  margin: 0 auto;
`;
const Main = styled.div`
  max-width: 800px;
`;
const RightNav = styled.div`
  width: 370px;
  min-width: 370px;
`;
const AFooter = styled.div`
  width: 100%;
`;
export default function AnswerEditP() {
  return (
    <Container>
      <APHeader>
        <Header />
      </APHeader>
      <MainContainer>
        <Nav />
        <Main>
          <AnswerEditMain />
        </Main>
        <RightNav>
          <AnswerNav />
        </RightNav>
      </MainContainer>
      <AFooter>
        <Footer />
      </AFooter>
    </Container>
  );
}
