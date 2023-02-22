import styled from 'styled-components';
import Header from '../components/common/Header/Header';
import Footer from '../components/common/Footer';
import Nav from '../components/common/Nav';

const Body = styled.div`
  margin-top: 53px;
  display: flex;
  justify-content: center;
`;

const Main = styled.main`
  display: grid;
  grid-template-rows: minmax(45px, auto) minmax(30px, auto) minmax(800px, auto);
  grid-template-areas:
    'title'
    'info'
    'main';
  > .title {
    grid-area: title;
    background-color: aqua;
    border: 3px solid green;
  }
  > .info {
    grid-area: info;
    background-color: lightyellow;
    border: 3px solid green;
  }
  > .main {
    grid-area: main;
    display: flex;
    @media screen and (max-width: 980px) {
      flex-direction: column;
    }
  }

  @media screen and (max-width: 640px) {
    width: 100%;
  }
`;

const Content = styled.div`
  width: 700px;
  background-color: purple;
  // 안에 채워넣으면 min-height 을 max-content로 바꿉니다.
  min-height: 500px;
  border: 10px solid green;
  min-width: 30px;

  @media screen and (max-width: 980px) {
    width: 98%;
  }
`;

const SideWrapper = styled.div`
  min-width: 300px;
  width: 300px;
  height: 1000px;
  background-color: green;
`;
const Side = styled.div`
  background-color: lightcoral;
  min-width: 300px;
  // 안에 채워넣으면 min-height 을 max-content로 바꿉니다.
  min-height: 500px;
  border: 10px solid green;

  @media screen and (max-width: 980px) {
    width: 98%;
  }
`;

function Test() {
  return (
    <>
      <Header />
      <Body>
        <Nav />
        <Main>
          <div className='title'>title</div>
          <div className='info'>info</div>
          <div className='main'>
            <Content>Content</Content>
            <SideWrapper className='side-wrapper'>
              <Side />
            </SideWrapper>
          </div>
        </Main>
      </Body>
      <Footer />
    </>
  );
}

export default Test;
