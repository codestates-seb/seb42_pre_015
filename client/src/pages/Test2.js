import styled from 'styled-components';

const Header = styled.div`
  grid-area: header;
  background-color: blue;
  position: sticky;
  top: 0px;
  width: 100vw;
  height: 53px;
`;

const Footer = styled.div`
  height: 300px;
  background-color: brown;
`;

const Main = styled.div`
  display: flex;
  width: 100%;
  margin: 0px 67px;
`;

const Nav = styled.div`
  background-color: yellow;
  width: 164px;
  height: 250px;
  position: sticky;
  top: 53px;
  /* left: 67px; */
`;

const Content = styled.div`
  display: grid;
  grid-template-rows: minmax(45px, auto) minmax(30px, auto) minmax(800px, auto);
  grid-template-columns: minmax(800px, auto) 300px;
  grid-template-areas:
    'title title'
    'info info'
    'main side';
  > .title {
    grid-area: title;
    background-color: aqua;
  }
  > .info {
    grid-area: info;
    background-color: red;
  }
  > .main {
    grid-area: main;
    background-color: green;
  }
  > .side {
    grid-area: side;
    background-color: lightcoral;
  }
`;

function Test() {
  return (
    <>
      <Header />
      <Main>
        <Nav />
        <Content>
          <div className='title'>title</div>
          <div className='info'>info</div>
          <div className='main'>main</div>
          <div className='side'>side</div>
        </Content>
      </Main>
      <Footer />
    </>
  );
}

export default Test;
