import styled from 'styled-components';
import Header from '../components/common/Header/Header';
import Footer from '../components/common/Footer';
import Nav from '../components/common/Nav';

import Question from '../components/DetailP/QuestionTemp';

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
  background-color: red;
`;

const Info = styled.div`
  min-height: 30px;
  background-color: yellow;
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

const Article = styled.div`
  background-color: purple;
  border: 3px solid blue;
  min-width: calc(100% - 300px);
  // side를 채워넣으면 height를 max-content로 바꿉니다.
  height: max-content;
  padding-right: 15px;
  @media screen and (max-width: 980px) {
    min-width: 100%;
  }
`;

const Side = styled.div`
  background-color: lightcoral;
  border: 3px solid black;
  min-width: 300px;
  // side를 채워넣으면 height를 max-content로 바꿉니다.
  height: 200px;
  @media screen and (max-width: 980px) {
    min-width: 100%;
  }
`;

function Test() {
  return (
    <>
      <Header />
      <Body>
        <Nav />
        <Main>
          <Title className='title'>title</Title>
          <Info className='info'>info</Info>
          <Content className='main'>
            <Article>
              Article
              <Question />
            </Article>
            <Side />
          </Content>
        </Main>
      </Body>
      <Footer />
    </>
  );
}

export default Test;
