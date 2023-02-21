import styled from 'styled-components';
import Header from '../components/common/Header/Header';

const LayOutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 800px 1fr;
  grid-template-rows: 53px 200px 1000px 500px;
`;
const LayOutHeader = styled.div`
  background-color: red;
  grid-column: 1/4;
`;
const LayOutLeftNav = styled.div`
  background-color: blue;
  grid-row: 2/4;
  display: flex;
  justify-content: right;
`;
const LayOutRightNav = styled.div`
  background-color: green;
  grid-row: 2/4;
  grid-column: 3/4;
`;
const LayOutMainTop = styled.div`
  background-color: gray;
`;
const LayOutMain = styled.div`
  background-color: yellow;
`;
const LayOutFooter = styled.div`
  background-color: purple;
  grid-row: 4/5;
  grid-column: 1/4;
`;
const Test = styled.div`
  width: 100%;
  height: 100%;
`;
const Nav = styled.div`
  top: 130px;
  width: 300px;
  height: 500px;
  background-color: white;
  position: fixed;
  min-width: 300px;
`;
export default function MainP() {
  return (
    <LayOutContainer>
      <LayOutHeader>
        <Header />
      </LayOutHeader>
      <LayOutLeftNav>
        <Nav></Nav>
      </LayOutLeftNav>
      <LayOutMainTop></LayOutMainTop>
      <LayOutMain>
        <Test>awdjpoj</Test>
      </LayOutMain>
      <LayOutRightNav></LayOutRightNav>
      <LayOutFooter></LayOutFooter>
      <div style={{ backgroundColor: 'black' }}></div>
      <div style={{ backgroundColor: 'red' }}></div>
      <div style={{ backgroundColor: 'green' }}></div>
      <div style={{ backgroundColor: 'pink' }}></div>
    </LayOutContainer>
  );
}
