import styled from 'styled-components';
import { GeneralBtn } from '../components/common/Buttons';
import Data from '../data/MOCK_DATA.json';
import { MainNav } from '../components/common/SideNav';
import Nav from '../components/common/Nav';
import Header from '../components/common/Header/Header';
import Footer from '../components/common/Footer';
import { useNavigate } from 'react-router-dom';

const MainPContainer = styled.div`
  padding: 24px 0 0 16px;
  @media screen and (max-width: 980px) {
    padding: 24px;
  }
`;
const MainTopTitle = styled.div`
  display: flex;
  height: 62px;
  justify-content: space-between;
  align-items: top;
  > h1 {
    font-size: 27px;
  }
`;
const MainTopBtnGather = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
`;
const MainTopBtn = styled.button`
  padding: 10.4px;
  margin: 0;
  color: #6a737c;
  border: 1px solid rgb(159, 166, 173);
  background-color: ${props => props.bgcolor || 'white'};
  border-radius: ${props => props.borderRadius || '0px'};
  &:hover {
    background-color: #f8f9f9;
    color: #525960;
  }
`;
const QuestionContainer = styled.div`
  padding: 16px;
  display: flex;
  border-top: 1px solid rgb(227, 230, 232);
  border-bottom: 1px solid rgb(227, 230, 232);
`;
const QuestionVote = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 108px;
  text-align: right;
  font-size: 13px;
  margin: 0 16px 4px 0;
  > p {
    padding-bottom: 10px;
  }
  @media screen and (max-width: 980px) {
    display: none;
  }
`;
const Question = styled.div`
  > div {
    margin: -2px 0 5px 0;

    > a {
      font-size: 17px;
      white-space: normal;
      text-decoration: none;
      color: rgb(0, 116, 204);
    }
  }
  @media screen and (max-width: 980px) {
    padding-right: 13px;
  }
`;
const QuestionBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TagContainer = styled.div`
  display: flex;
  margin-bottom: 13px;
  button {
    padding: 6px;
    margin: 0 2px 2px 0;
    background-color: rgb(225, 236, 244);
    color: rgb(57, 115, 157);
    border-radius: 4px;
  }
`;
const UserContainer = styled.div`
  display: flex;
  justify-content: right;
  a {
    margin: 0 2px;
    text-decoration: none;
    color: rgb(0, 116, 204);
  }
  span {
    margin: 0 2px;
  }
`;
const NavContainer = styled.div`
  border-right: 1px solid #d0d4d7;
  @media screen and (max-width: 640px) {
    display: none;
  }
`;
const MainFilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  > p {
    font-size: 17px;
    color: rgb(35, 38, 41);
  }
`;

const QuestionDesContainer = styled.div`
  > p {
    white-space: normal;
    font-size: 13px;
    margin-bottom: 8px;
  }
`;
export function MainComponent() {
  const navigate = useNavigate();
  return (
    <div>
      <MainPContainer>
        <MainTopTitle>
          <h1>All Questions</h1>
          <GeneralBtn
            BtnText='Ask Question'
            width='98px'
            height='40px'
            onClick={() => {
              navigate('/ask');
            }}
          />
        </MainTopTitle>
        <MainFilterContainer>
          <p>23,530,547 questions</p>
          <MainTopBtnGather>
            <MainTopBtn borderRadius='4px 0 0 4px' bgcolor='#e3e6e8'>
              Newest
            </MainTopBtn>
            <MainTopBtn>Oldest</MainTopBtn>
            <MainTopBtn borderRadius='0 4px 4px 0'>Vote</MainTopBtn>
          </MainTopBtnGather>
        </MainFilterContainer>
      </MainPContainer>
      {Data.map((el, index) => {
        return (
          <QuestionContainer key={index}>
            <QuestionVote>
              <p>{el.vote} votes</p>
              <p style={{ color: 'rgb(82,89,96)' }}>{el.answer} answers</p>
              <p style={{ color: 'rgb(82,89,96)' }}>{el.views} views</p>
            </QuestionVote>
            <Question>
              <div>
                <a href='/#'>{el.question}</a>
              </div>
              <QuestionDesContainer>
                <p>
                  I have github pages everything is working just fine except for
                  the images stuff. Ive tried everything to make the image show
                  up on my GitHub pages site but nothing is working here is the
                  c
                </p>
              </QuestionDesContainer>
              <QuestionBottom>
                <TagContainer>
                  <button>Java</button>
                  <button>Python</button>
                  <button>Java Script</button>
                </TagContainer>
                <UserContainer>
                  <a href='/#'>{el.Writer}</a>
                  <span>{el.asked}</span>
                  <a href='/#'>
                    modified{' '}
                    <span style={{ color: 'rgb(82,89,96)' }}>{el.date}</span>
                  </a>
                </UserContainer>
              </QuestionBottom>
            </Question>
          </QuestionContainer>
        );
      })}
    </div>
  );
}

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
  width: 300px;
  min-width: 300px;
  margin-left: 16px;
  @media screen and (max-width: 980px) {
    display: none;
  }
`;
const AFooter = styled.div`
  width: 100%;
`;

export default function MainP() {
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
          <MainComponent />
        </Main>
        <RightNav>
          <MainNav />
        </RightNav>
      </MainContainer>
      <AFooter>
        <Footer />
      </AFooter>
    </Container>
  );
}
