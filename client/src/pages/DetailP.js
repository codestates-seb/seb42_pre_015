import styled from 'styled-components';
import Footer from '../components/common/Footer';
import Nav from '../components/common/Nav';
import { GeneralBtn } from '../components/common/Buttons';
import Question from '../components/DetailP/Question';
import Answer from '../components/DetailP/Answer';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { MainNav } from '../components/common/SideNav';
import { useNavigate, useParams } from 'react-router-dom';

const Body = styled.div`
  margin-top: 53px;
  display: flex;
  justify-content: center;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  width: calc(50vw + 300px);
  @media screen and (max-width: 980px) {
    flex-direction: column;
    width: calc(100% - 164px);
  }
  @media screen and (max-width: 640px) {
    width: 100%;
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
    z-index: 0;
  }
`;

const NavContainer = styled.div`
  border-right: 1px solid #d0d4d7;
  @media screen and (max-width: 640px) {
    display: none;
  }
`;

const Loading = styled.div`
  width: calc(50vw + 300px);
  height: 100vh;
  background-color: #fff;
`;

function DetailPage() {
  const navigate = useNavigate();
  // ! QuestionList랑 연결하고 나서는 url 동적으로 만들기
  const { questionId } = useParams();

  const [questionData, setQuestionData] = useState(null);
  const [isQuestionLoading, setIsQuestionLoading] = useState(true);

  useEffect(() => {
    // ! async await 을 사용하여 question 과 vote 데이터를 하나의 res로 합치기
    axios
      .get(process.env.REACT_APP_DB_HOST + `/question/${questionId}`)
      .then(res => {
        setQuestionData(res.data);
        setIsQuestionLoading(false);

        // 페이지 변경 시 항상 상단으로 위치.
        window.scrollTo(0, 0);
      });
  }, [questionId]);

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return (
    <>
      <Body>
        <NavContainer>
          <Nav />
        </NavContainer>
        {isQuestionLoading && <Loading>Loading...</Loading>}
        {questionData && (
          <Main>
            <Title className='title'>
              <h1>{questionData.title}</h1>
              <GeneralBtn
                BtnText='Ask Question'
                width='100px'
                onClick={() => {
                  accessToken && refreshToken
                    ? navigate('/ask')
                    : navigate('/login');
                }}
              />
            </Title>
            <Info className='info'>
              <ul>
                <li>
                  Asked{' '}
                  {questionData.createdAt
                    .replace(/T/, ' ')
                    .replace(/:\d\d(\.\d{1,6})?$/, '')}
                </li>
                <li>
                  Modified{' '}
                  {questionData.modifiedAt
                    .replace(/T/, ' ')
                    .replace(/:\d\d(\.\d{1,6})?$/, '')}
                </li>
                <li>Viewed {questionData.viewCount} times</li>
              </ul>
            </Info>
            <Content className='main'>
              <Article>
                <Question
                  questionId={questionId}
                  questionData={questionData}
                  setQuestionData={setQuestionData}
                />
                <Answer questionId={questionId} />
              </Article>
              <Side>
                <MainNav />
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
