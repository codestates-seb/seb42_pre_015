import styled from 'styled-components';
import { GeneralBtn } from '../components/common/Buttons';
// import Data from '../data/MOCK_DATA.json';
import { MainNav } from '../components/common/SideNav';
import Nav from '../components/common/Nav';
import Header from '../components/common/Header/Header';
import Footer from '../components/common/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';

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
  /* border-bottom: 1px solid rgb(227, 230, 232); */
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

const PageNationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  padding-left: 24px;
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    li {
      display: flex;
      align-items: center;
      border: 1px solid rgb(214, 217, 220);
      height: 25px;
      border-radius: 3px;
      margin: 0 3px;
      padding: 0 8px;
      background-color: 'white';
      &:hover {
        background-color: 'gray';
      }
      &.active {
        background-color: #f48225;
        a {
          cursor: default;
          color: white;
          font-size: 13px;
        }
      }
    }
  }
`;

export function MainComponent() {
  const [AllQestion, setAllQuestion] = useState([]);
  const [PageNationData, setPageNationData] = useState([]);
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = pageNumber => {
    setActivePage(pageNumber);
    console.log(pageNumber);
  };

  const serverUrl = 'http://localhost:3001';
  useEffect(() => {
    axios
      .get(`${serverUrl}/questionData`)
      .then(res => {
        setAllQuestion(res.data.data);
        setPageNationData(res.data.pageInfo);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

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
          <p>{PageNationData.totalElements} questions</p>
          <MainTopBtnGather>
            <MainTopBtn borderRadius='4px 0 0 4px' bgcolor='#e3e6e8'>
              Newest
            </MainTopBtn>
            <MainTopBtn>Oldest</MainTopBtn>
            <MainTopBtn borderRadius='0 4px 4px 0'>Vote</MainTopBtn>
          </MainTopBtnGather>
        </MainFilterContainer>
      </MainPContainer>
      {AllQestion.map((el, index) => {
        return (
          <QuestionContainer key={index}>
            <QuestionVote>
              <p>{el.voteCount} votes</p>
              <p style={{ color: 'rgb(82,89,96)' }}>{el.answer} answers</p>
              <p style={{ color: 'rgb(82,89,96)' }}>{el.viewCount} views</p>
            </QuestionVote>
            <Question>
              <div>
                <a href='/#'>{el.title}</a>
              </div>
              <QuestionDesContainer>
                <p>{el.content}</p>
              </QuestionDesContainer>
              <QuestionBottom>
                <TagContainer>
                  <button>Java</button>
                  <button>Python</button>
                  <button>Java Script</button>
                </TagContainer>
                <UserContainer>
                  <a href='/#'>{el.userName}</a>
                  <span>{el.asked}</span>
                  <a href='/#'>
                    modified{' '}
                    <span style={{ color: 'rgb(82,89,96)' }}>
                      {el.modifiedAt}
                    </span>
                  </a>
                </UserContainer>
              </QuestionBottom>
            </Question>
          </QuestionContainer>
        );
      })}
      <PageNationContainer>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={20}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          prevPageText='Prev'
          nextPageText='Next'
        />
      </PageNationContainer>
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
