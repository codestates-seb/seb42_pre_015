import styled from 'styled-components';
import { AnswerEditMain } from '../components/common/EditP';
import { AnswerEditNav } from '../components/common/SideNav';
import Nav from '../components/common/Nav';
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
export default function AnswerEditP() {
  return (
    <Container>
      <APHeader></APHeader>
      <MainContainer>
        <NavContainer>
          <Nav />
        </NavContainer>
        <Main>
          <AnswerEditMain />
        </Main>
        <RightNav>
          <AnswerEditNav />
        </RightNav>
      </MainContainer>
      <AFooter>
        <Footer />
      </AFooter>
    </Container>
  );
}
