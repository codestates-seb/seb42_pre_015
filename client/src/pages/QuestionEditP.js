import styled from 'styled-components';
import { QuestionEditMain } from '../components/common/EditP/EditP';
import { QuestionNav } from '../components/common/EditP/EditNav';
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
  @media screen and (max-width: 980px) {
    display: none;
  }
`;
const AFooter = styled.div`
  width: 100%;
`;
const NavContainer = styled.div`
  border-right: 1px solid #d0d4d7;
  @media screen and (max-width: 640px) {
    display: none;
  }
`;
export default function QuestionEditP() {
  return (
    <Container>
      <APHeader>
        <Header />
      </APHeader>
      <MainContainer>
        <NavContainer>
          <Nav />
        </NavContainer>
        <Main>
          <QuestionEditMain />
        </Main>
        <RightNav>
          <QuestionNav />
        </RightNav>
      </MainContainer>
      <AFooter>
        <Footer />
      </AFooter>
    </Container>
  );
}
