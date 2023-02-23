import styled from 'styled-components';
import Header from '../components/common/Header/Header';
import Footer from '../components/common/Footer';
import Nav from '../components/common/Nav';
import { GeneralBtn } from '../components/common/Buttons';
import Question from '../components/DetailP/Question';
import Answer from '../components/DetailP/Answer';
import { questionData, answerData } from '../data/dummyData';

const Body = styled.div`
  margin-top: 53px;
  display: flex;
  justify-content: center;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  width: 80%;
  @media screen and (max-width: 980px) {
    flex-direction: column;
    width: 95%;
  }
`;

const Title = styled.div`
  min-height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > h1 {
    font-size: 27px;
    white-space: normal;
  }
`;

const Info = styled.div`
  min-height: 30px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dee2e5;
  padding-bottom: 8px;
  margin-bottom: 16px;
  > ul {
    display: flex;
    > li {
      margin-right: 10px;
      color: #5f6871;
    }
  }
`;

const Content = styled.div`
  min-height: max-content;
  display: flex;
  @media screen and (max-width: 980px) {
    flex-direction: column;
    margin-right: 10px;
    width: 100%;
  }
`;

const Article = styled.article`
  min-width: calc(100% - 300px);
  // ! side를 채워넣으면 height를 max-content로 바꿉니다.
  height: 100%;
  padding-right: 16px;

  display: flex;
  flex-direction: column;
  @media screen and (max-width: 980px) {
    min-width: 100%;
  }
`;

const Side = styled.aside`
  min-width: 300px;
  // !side를 채워넣으면 height를 max-content로 바꿉니다.
  min-height: max-content;
  @media screen and (max-width: 980px) {
    min-width: 100%;
  }
`;

const NavContainer = styled.div`
  border-right: 1px solid #d0d4d7;
  @media screen and (max-width: 640px) {
    display: none;
  }
`;

function DetailPage() {
  // const { questoinId } = useParams();
  // const [questionData, questionIsPending, questionError] = useFetch(`http://localhost:3001/question/${questionId}`)
  // const [answerData, answerIsPending, answerError] = useFetch(`http://localhost:3001/question/${questionId}/answer`)

  // const { questoinId } = useParams();
  // const [answerCommentData, answerCommentIsPending, answerCommentError] = useFetch(`http://localhost:3001/question/${questionId}/answer/${answer-id}`/comment)

  return (
    <>
      <Header />
      <Body>
        <NavContainer>
          <Nav />
        </NavContainer>
        {questionData && answerData && (
          <Main>
            <Title className='title'>
              <h1>{questionData.title}</h1>
              <GeneralBtn BtnText='Ask Question' width='100px' />
            </Title>
            <Info className='info'>
              <ul>
                <li>Asked {questionData.createdAt}</li>
                <li>Modified {questionData.modifiedAt}</li>
                <li>Viewed {questionData.viewCount} times</li>
              </ul>
            </Info>
            <Content className='main'>
              <Article>
                <Question questionData={questionData} />
                <Answer answerData={answerData} />
              </Article>
              <Side>
                <div>Something...</div>
              </Side>
            </Content>
          </Main>
        )}
      </Body>
      <Footer />
    </>
  );
}

export default DetailPage;
