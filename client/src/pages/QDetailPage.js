import styled from 'styled-components';

const Page = styled.div`
  display: grid;
  grid-template-rows: 50px 1000px 100px;
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
`;

const Nav = styled.div`
  width: 164px;
  height: 180px;
  position: sticky;
  padding-top: 10px;
  background-color: yellow;
  @media screen and (max-width: 640px) {
    display: none;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 800px 300px;
  grid-template-rows: 50px 34px 10px;
  grid-template-areas:
    'question-header question-header'
    'question-info question-info'
    'mainbar sidebar';
  > .question-header {
    grid-area: question-header;
    background: red;
  }
  > .question-info {
    grid-area: question-info;
    background: green;
  }
  > .mainbar {
    grid-area: mainbar;
    background: purple;
    height: 800px;
  }
  > .sidebar {
    grid-area: sidebar;
    width: 300px;
    height: 800px;
    background: blue;
  }
  @media screen and (max-width: 1100px) {
    // remove sidebar
    grid-template-areas:
      'question-header question-header'
      'question-info question-info'
      'mainbar mainbar';
    > .sidebar {
      display: none;
    }
  }
`;

function QDetailPage() {
  return (
    <Page>
      <div className='header' style={{ background: 'grey' }}>
        Header
      </div>
      <Main className='main'>
        <Nav className='nav'></Nav>
        <Content className='content'>
          <div className='question-header'></div>
          <div className='question-info'></div>
          <div className='mainbar'></div>
          <div className='sidebar'>
            <img
              src='https://s0.2mdn.net/simgad/6461253748063549381'
              alt='advertisement'
            />
          </div>
        </Content>
      </Main>
      <div className='footer' style={{ background: 'grey' }}>
        Footer
      </div>
    </Page>
  );
}

export default QDetailPage;
