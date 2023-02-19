import styled from 'styled-components';
import WritingTipBox from '../components/AskQuestionP/WritingTipBox';
import WritingGoodQBox from '../components/AskQuestionP/WritingGoodQBox';
import { ReactComponent as AskQuestionBackground } from '../assets/AskQuestionP/askquestion-background.svg';

const Page = styled.div`
  // 헤더, 푸터 작업 완료되면 지워도 되는 코드
  display: grid;
  grid-template-rows: 50px auto 100px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border: 1px solid red;
`;

const MainHeading = styled.div`
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  width: 85%;
  height: 410px;
  > .main-heading-title {
    // !반응형에 따라 사진 없어지는 구역
    display: flex;
    height: 130px;
    > h1 {
      width: 70%;
      font-size: 27px;
      font-weight: 550;
      padding-top: 50px;
    }
  }
`;

const MainBody = styled.div`
  border: 1px solid blue;
  width: 85%;
  display: flex;
  > .main-body-form {
    background-color: lightpink;
    width: 70%;
    max-width: 850px;
  }
  > .main-body-tips {
  }
`;

function AskQuestionPage() {
  return (
    <Page className='page'>
      <div className='header' style={{ background: 'grey' }}>
        Header
      </div>
      <Main>
        <MainHeading>
          <div className='main-heading-title'>
            <h1>Ask a public question</h1>
            <AskQuestionBackground className='icon' />
          </div>
          <WritingGoodQBox />
        </MainHeading>
        <MainBody>
          <form className='main-body-form'>
            <div>
              <label htmlFor='title'>Title</label>
              <input type='text' id='title'></input>
            </div>
            <div>
              <label htmlFor='title'>Title</label>
              <input type='text' id='title'></input>
            </div>
            <div>
              <label htmlFor='title'>Title</label>
              <input type='text' id='title'></input>
            </div>
          </form>
          <div className='main-body-tips'>
            <WritingTipBox />
          </div>
        </MainBody>
      </Main>
      <div className='footer' style={{ background: 'grey' }}>
        Footer
      </div>
    </Page>
  );
}

export default AskQuestionPage;
