import styled from 'styled-components';
import { GeneralBtn } from '../components/common/Buttons';
import Data from '../data/MOCK_DATA.json';
import { AnswerNav } from '../components/common/EditP/EditNav';
import Nav from '../components/common/Nav';
import Header from '../components/common/Header/Header';
import Footer from '../components/common/Footer';

const MainPContainer = styled.div`
  padding: 24px;
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
  margin-bottom: 16px;
`;
const MainTopBtn = styled.button`
  padding: 10.4px;
  margin: 0;
  color: #6a737c;
  border: 1px solid rgb(159, 166, 173);
  background-color: white;
  border-radius: ${props => props.borderRadius || '0px'};
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
  justify-content: space-between;
  min-width: 108px;
  text-align: right;
  font-size: 13px;
  margin: 0 16px 4px 0;
`;
const Question = styled.div`
  min-width: 640px;
  > div {
    margin: -2px 0 5px 0;

    > a {
      font-size: 17px;
      white-space: normal;
      text-decoration: none;
      color: rgb(0, 116, 204);
    }
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

export function MainComponent() {
  return (
    <div>
      <MainPContainer>
        <MainTopTitle>
          <h1>Top Questions</h1>
          <div style={{ width: '70px' }}>
            <GeneralBtn>Ask Question</GeneralBtn>
          </div>
        </MainTopTitle>
        <MainTopBtnGather>
          <MainTopBtn borderRadius='4px 0 0 4px'>Interesting</MainTopBtn>
          <MainTopBtn>Bountied</MainTopBtn>
          <MainTopBtn>Hot</MainTopBtn>
          <MainTopBtn>Week</MainTopBtn>
          <MainTopBtn borderRadius='0 4px 4px 0'>Month</MainTopBtn>
        </MainTopBtnGather>
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
  width: 370px;
  min-width: 370px;
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
        <Nav />
        <Main>
          <MainComponent />
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
