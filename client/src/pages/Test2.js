import styled from 'styled-components';

const Header = styled.div`
  //! Header 컴포넌트를 불러오면 삭제해도 되는 코드입니다.
  grid-area: header;
  background-color: blue;
  position: fixed;
  top: 0px;
  width: 100vw;
  height: 53px;
`;

const Footer = styled.div`
  //! Footer 컴포넌트를 불러오면 삭제해도 되는 코드입니다.
  height: 300px;
  background-color: brown;
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  /* top: 53px; */
  margin-top: 53px;
`;

const Main = styled.div`
  display: grid;
  grid-template-rows: minmax(45px, auto) minmax(30px, auto) minmax(800px, auto);
  grid-template-areas:
    'title'
    'info'
    'main';
  > .title {
    grid-area: title;
    background-color: aqua;
  }
  > .info {
    grid-area: info;
    background-color: lightyellow;
  }
  > .main {
    grid-area: main;
    display: flex;
    @media screen and (max-width: 980px) {
      flex-direction: column;
    }
  }
`;

const Content = styled.div`
  width: 700px;
  background-color: purple;
  // 안에 채워넣으면 min-height 을 max-content로 바꿉니다.
  min-height: 500px;
`;
const Side = styled.div`
  background-color: lightcoral;
  min-width: 300px;
  // 안에 채워넣으면 min-height 을 max-content로 바꿉니다.
  min-height: 500px;

  @media screen and (max-width: 980px) {
    min-width: 100%;
  }
`;

const Nav = styled.div`
  //! Nav 컴포넌트를 불러오면 삭제해도 되는 코드입니다.
  background-color: yellow;
  min-width: 164px;
  height: 250px;
  position: sticky;
  top: 53px;
  border: 10px solid red;

  @media screen and (max-width: 640px) {
    display: none;
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
            <Side>Side</Side>
          </div>
        </Main>
      </Body>
      <Footer />
    </>
  );
}

export default Test;
