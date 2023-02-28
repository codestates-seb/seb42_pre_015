import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import { useNavigate, Link } from 'react-router-dom';

import Tag from '../components/common/Tag';
import Nav from '../components/common/Nav';
import Footer from '../components/common/Footer';
import { GeneralBtn } from '../components/common/Buttons';
import { MainNav } from '../components/common/SideNav';

const MainPContainer = styled.div`
  padding: 5px 0 0 16px;
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
  cursor: pointer;
  padding: 10.4px;
  margin: 0;
  color: #6a737c;
  border: 1px solid rgb(159, 166, 173);
  background-color: ${props => (props.active ? '#e3e6e8' : '#FFFFFF')};
  border-radius: ${props => props.borderRadius || '0px'};
  &:hover {
    background-color: ${props => (props.active ? '#e3e6e8' : '#f8f9f9')};
    color: #525960;
  }
`;
const StylePageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StylePageBtn = styled.button`
  display: flex;
  align-items: center;
  border: 1px solid rgb(214, 217, 220);
  height: 25px;
  border-radius: 3px;
  margin: 0 3px;
  padding: 0 8px;
  background-color: ${props => (props.active ? '#f48225;' : 'white')};
  &:hover {
    background-color: ${props => (props.active ? '#f48225;' : 'gray')};
  }
`;

const QuestionContainer = styled.div`
  padding: 16px;
  display: flex;
  border-top: 1px solid rgb(227, 230, 232);
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
  width: 100%;
  > div {
    margin: -2px 0 5px 0;
    > a {
      font-size: 17px;
      white-space: normal;
      text-decoration: none;
      color: rgb(0, 116, 204);
      line-height: 1.5;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
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
  > div > p {
    white-space: normal;
    font-size: 13px;
    margin-bottom: 8px;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  > div {
    white-space: normal;
    font-size: 13px;
    margin-bottom: 8px;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;

const PageNationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  padding-left: 24px;
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
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
  const [activeButton, setActiveButton] = useState(1);
  const [activePageItemButton, setActivePageItemButton] = useState(15);
  const [Filter, setFilter] = useState('createdAt,desc');

  const handlePageItemClick = buttonNumber => {
    setActivePageItemButton(buttonNumber);
  };

  const handleFilterClick = buttonNumber => {
    setActiveButton(buttonNumber);
    if (buttonNumber === 1) {
      setFilter('createdAt,desc');
    } else if (buttonNumber === 2) {
      setFilter('createdAt,asc');
    } else if (buttonNumber === 3) {
      setFilter('voteCount,desc');
    }
  };

  const handlePageChange = pageNumber => {
    setActivePage(pageNumber);
  };

  useEffect(() => {
    axios
      .get(`/question`, {
        params: {
          page: activePage,
          size: activePageItemButton,
          sort: Filter
        }
      })
      .then(res => {
        setAllQuestion(res.data.data);
        setPageNationData(res.data.pageInfo);
      })
      .catch(error => {
        console.error(error);
      });
  }, [activePage, activePageItemButton, Filter]);

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
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
              accessToken && refreshToken
                ? navigate('/ask')
                : navigate('/login');
            }}
          />
        </MainTopTitle>
        <MainFilterContainer>
          <p>{PageNationData.totalElements} questions</p>
          <MainTopBtnGather>
            <MainTopBtn
              borderRadius='4px 0 0 4px'
              active={activeButton === 1}
              onClick={() => handleFilterClick(1)}
            >
              Newest
            </MainTopBtn>
            <MainTopBtn
              active={activeButton === 2}
              onClick={() => handleFilterClick(2)}
            >
              Oldest
            </MainTopBtn>
            <MainTopBtn
              borderRadius='0 4px 4px 0'
              active={activeButton === 3}
              onClick={() => handleFilterClick(3)}
            >
              Vote
            </MainTopBtn>
          </MainTopBtnGather>
        </MainFilterContainer>
      </MainPContainer>
      {AllQestion.map((el, index) => {
        return (
          <QuestionContainer key={index}>
            <QuestionVote>
              <p>{el.voteCount} votes</p>
              <p style={{ color: 'rgb(82,89,96)' }}>{el.answerCount} answers</p>
              <p style={{ color: 'rgb(82,89,96)' }}>{el.viewCount} views</p>
            </QuestionVote>
            <Question>
              <div>
                <Link to={`/question/${el.questionId}`}>{el.title}</Link>
              </div>
              <QuestionDesContainer>
                <div dangerouslySetInnerHTML={{ __html: `${el.content}` }} />
              </QuestionDesContainer>
              <QuestionBottom>
                <TagContainer>
                  <Tag tags={el.tags} />
                </TagContainer>
                <UserContainer>
                  <a href='/#'>{el.name}</a>
                  <span>{el.asked}</span>
                  <a href='/#'>
                    createdAt
                    <span
                      style={{ color: 'rgb(82,89,96)', marginLeft: '10px' }}
                    >
                      {el.createdAt
                        .replace(/T/, ' ')
                        .replace(/:\d\d(.\d{1,6})?$/, '')}
                    </span>
                  </a>
                </UserContainer>
              </QuestionBottom>
            </Question>
          </QuestionContainer>
        );
      })}
      <PageNationContainer>
        {PageNationData.totalElements ? (
          <Pagination
            activePage={activePage}
            itemsCountPerPage={activePageItemButton}
            totalItemsCount={PageNationData.totalElements}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            prevPageText='Prev'
            nextPageText='Next'
          />
        ) : (
          <></>
        )}
        <StylePageContainer>
          <StylePageBtn
            active={activePageItemButton === 15}
            onClick={() => handlePageItemClick(15)}
          >
            15
          </StylePageBtn>
          <StylePageBtn
            active={activePageItemButton === 30}
            onClick={() => handlePageItemClick(30)}
          >
            30
          </StylePageBtn>
          <StylePageBtn
            active={activePageItemButton === 50}
            onClick={() => handlePageItemClick(50)}
          >
            50
          </StylePageBtn>
          <p style={{ margin: '0 10px' }}>per page</p>
        </StylePageContainer>
      </PageNationContainer>
    </div>
  );
}

const Container = styled.div`
  margin-top: 53px;
  display: flex;
  justify-content: center;
`;
const NavContainer1 = styled.div`
  border-right: 1px solid #d0d4d7;
  @media screen and (max-width: 640px) {
    display: none;
  }
`;
const MainNavv = styled.div`
  display: flex;
  @media screen and (max-width: 980px) {
    flex-direction: column;
    width: 100%;
  }
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  width: 50vw;
  max-width: 726px;
  @media screen and (max-width: 980px) {
    flex-direction: column;
    width: 100%;
  }
  @media screen and (max-width: 640px) {
    width: 100%;
  }
`;
const RightNav = styled.div`
  min-width: 300px;
  // !side를 채워넣으면 height를 max-content로 바꿉니다.
  min-height: max-content;
  @media screen and (max-width: 980px) {
    width: 95%;
    margin-bottom: 40px;
    z-index: 0;
  }
`;

export default function MainP() {
  return (
    <>
      <Container>
        <NavContainer1>
          <Nav />
        </NavContainer1>
        <MainNavv>
          <MainContainer>
            <MainComponent />
          </MainContainer>
          <RightNav>
            <MainNav />
          </RightNav>
        </MainNavv>
      </Container>
      <Footer />
    </>
  );
}
