import styled from 'styled-components';

const Page = styled.div`
  display: grid;
  grid-template-rows:
    53px minmax(45px, auto) minmax(30px, auto) minmax(500px, auto)
    200px;
  grid-template-columns: minmax(164px, 180px) auto 300px;
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
    width: 100%;
    height: 53px;
  }
  > .nav {
    grid-area: nav;
    background-color: lightpink;
    display: flex;
    justify-content: flex-end;
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

function QDetailPage() {
  return (
    <Page>
      <div className='header'>Header</div>
      <div className='nav'>
        <div className='nav-component'>Nav Component</div>
      </div>
      <div className='title'>title</div>
      <div className='info'>info</div>
      <div className='main'>main</div>
      <div className='side'>
        <img
          src='https://s0.2mdn.net/simgad/6461253748063549381'
          alt='advertisement'
        />
      </div>
      <div className='footer'>footer</div>
    </Page>
  );
}

export default QDetailPage;
