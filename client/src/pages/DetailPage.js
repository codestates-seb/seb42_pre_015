import styled from 'styled-components';
import { ArrowUpSvg, ArrowDownSvg } from '../assets/DetailSvg';

const Page = styled.div`
  display: grid;
  margin: 0px 66px;
  grid-template-rows:
    53px minmax(45px, auto) minmax(30px, auto) minmax(500px, auto)
    200px;
  grid-template-columns: minmax(164px, 230px) auto minmax(300px, auto);
  grid-template-areas:
    'header header header'
    'nav title title'
    'nav info info'
    'nav main side'
    'footer footer footer';
  > .header {
    // !header 컴포넌트가 위치할 자리
    grid-area: header;
    position: fixed;
    background-color: orange;
    width: 100vw;
    height: 53px;
  }
  > .nav {
    grid-area: nav;
    background-color: lightpink;
    display: flex;
    justify-content: flex-end;
    margin-left: 66px;
    > .nav-component {
      // !nav 컴포넌트가 위치할 자리
      position: fixed;
      width: 164px;
      height: 250px;
      background-color: yellow;
    }
  }
  > .title {
    grid-area: title;
    background-color: aqua;
    /* margin-right: 66px; */
  }
  > .info {
    grid-area: info;
    background-color: red;
    /* margin-right: 66px; */
  }
  > .main {
    grid-area: main;
    background-color: green;
  }
  > .side {
    grid-area: side;
    background-color: lightcoral;
    /* margin-right: 66px; */
  }
  > .footer {
    grid-area: footer;
    background-color: bisque;
  }
  @media screen and (max-width: 1100px) {
    > .side {
      display: none;
    }
    grid-template-areas:
      'header header header'
      'nav title title'
      'nav info info'
      'nav main main'
      'footer footer footer';
  }
  @media screen and (max-width: 640px) {
    > .nav {
      display: none;
    }
    grid-template-areas:
      'header header header'
      'title title title'
      'info info info'
      'main main main'
      'footer footer footer';
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px;
  > div {
    width: 80%;
    h1 {
      font-size: 27px;
      width: 90%;
      color: rgb(59, 64, 59);
      white-space: normal;
    }
  }
  > button {
    width: 103px;
    height: 37px;
  }
`;

function QDetailPage() {
  return (
    <Page>
      <div className='header'>Header</div>
      <div className='nav'>
        <div className='nav-component'>Nav Component</div>
      </div>
      <Title className='title'>
        <div>
          <h1>How to select floating data from json array in postgreSQL</h1>
        </div>
        <button>Ask Question</button>
      </Title>
      <div className='info'>
        <ul>
          <li>Asked today</li>
          <li>Modified today</li>
          <li>Viewed 10 times</li>
        </ul>
      </div>
      <div className='main'>
        <ArrowUpSvg />
        <ArrowDownSvg />
      </div>
      <div className='side'>
        <div>Haha</div>
      </div>
      <div className='footer'>footer</div>
    </Page>
  );
}

export default QDetailPage;
