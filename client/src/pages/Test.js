import styled from 'styled-components';

const Page = styled.div`
  display: grid;
  margin: 0px 65px;
  grid-template-rows:
    53px minmax(45px, auto) minmax(30px, auto) minmax(800px, auto)
    200px;
  grid-template-columns: minmax(164px, 200px) auto 300px;
  grid-template-areas:
    'header header header'
    'nav title title'
    'nav info info'
    'nav main side'
    'footer footer footer';
  > .header {
    grid-area: header;
    background-color: blue;
    position: sticky;
    top: 0px;
  }
  > .nav {
    grid-area: nav;
    background-color: lightpink;
    display: flex;
    justify-content: flex-end;
    > div {
      background-color: yellow;
      width: 164px;
      height: 250px;
      position: sticky;
      top: 53px;
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
`;

function Test() {
  return (
    <Page>
      <div className='header'>Header</div>
      <div className='nav'>
        <div>Nav component</div>
      </div>
      <div className='title'>title</div>
      <div className='info'>info</div>
      <div className='main'>main</div>
      <div className='side'>side</div>
      <div className='footer'>footer</div>
    </Page>
  );
}

export default Test;
