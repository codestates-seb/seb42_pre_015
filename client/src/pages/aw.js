import styled from 'styled-components';
import { GeneralBtn } from '../components/common/Buttons';

const Test = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    width: 800px;
    height: 500px;
    border: 1px solid black;
  }
`;
const MainPContainer = styled.div`
  width: 100%;
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
  width: 108px;
  text-align: right;
  font-size: 13px;
  margin: 0 16px 4px 0;
`;
const Question = styled.div`
  width: 100%;
  background-color: red;
  a {
    font-size: 17px;
    text-align: right;
    margin-bottom: -2px 0 5px 0;
    padding-right: 24px;
  }
`;
const TagContainer = styled.div`
  display: flex;
`;
const UserContainer = styled.div`
  display: flex;
  justify-content: right;
`;
export default function Main() {
  return (
    <Test>
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
        <QuestionContainer>
          <QuestionVote>
            <p>0 votes</p>
            <p>0 answers</p>
            <p>7 views</p>
          </QuestionVote>
          <Question>
            <a href='/#'>
              How do I test if all ths Variables are present inside the
              settings?
            </a>
            <div>
              <TagContainer></TagContainer>
              <UserContainer></UserContainer>
            </div>
          </Question>
        </QuestionContainer>
      </div>
    </Test>
  );
}
