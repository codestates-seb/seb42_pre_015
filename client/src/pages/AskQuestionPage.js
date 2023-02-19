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
  margin: 0px 20px;
`;

const MainHeading = styled.div`
  width: 85%;
  height: 410px;
  display: flex;
  flex-direction: column;
  > .main-heading-title {
    height: 130px;
    display: flex;
    justify-content: flex-end;
    > h1 {
      font-size: 27px;
      font-weight: 550;
      padding-top: 50px;
    }
  }

  @media screen and (max-width: 1050px) {
    width: 100%;
    .ask-question-background {
      visibility: hidden;
    }
  }
`;

const MainBody = styled.div`
  width: 85%;
  display: grid;
  grid-template-rows: 150px 380px 150px;
  > .form {
    display: grid;
    grid-template-columns: 70% 30%;
    grid-column-gap: 15px;
    margin-bottom: 15px;
  }

  @media screen and (max-width: 1050px) {
    width: 100%;
    > .form {
      display: flex;
      flex-direction: column-reverse;
    }
  }
`;

const InputBox = styled.div`
  width: 100%;
  border: 1.5px solid #e0e2e5;
  border-radius: 3px;
  height: auto;
  background-color: #fff;
  padding: 24px;
  > label {
    font-weight: 600;
    font-size: 15px;
  }
  > p {
    color: #33383d;
    font-size: 12px;
    margin: 7px 0px;
  }
  > input,
  textarea {
    border: 1px solid #ced2d5;
    border-radius: 3px;
    width: 100%;
    padding: 7.8px 9.1px;
    font-size: 13px;
    &:focus {
      box-shadow: 0 0 0 4px #d9e9f6;
      border: 1px solid #409ad6;
      outline: none;
    }
  }
  > textarea {
    height: 250px;
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
            <AskQuestionBackground className='ask-question-background' />
          </div>
          <WritingGoodQBox />
        </MainHeading>
        <MainBody>
          <div className='form form-title'>
            <InputBox>
              <label htmlFor='title'>Title</label>
              <p>
                Be specific and imagine you’re asking a question to another
                person.
              </p>
              <input
                type='text'
                id='title'
                placeholder='e.g. Is there an R function for finding the index of an element in a vector?'
              ></input>
            </InputBox>
            <WritingTipBox />
          </div>
          <div className='form form-content'>
            <InputBox>
              <label htmlFor='content'>
                What are the details of your problem?
              </label>
              <p>
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </p>
              <textarea type='text' id='content'></textarea>
            </InputBox>
            <WritingTipBox />
          </div>
          <div className='form form-tags'>
            <InputBox>
              <label htmlFor='tags'>Tag</label>
              <p>
                Add up to 5 tags to describe what your question is about. Start
                typing to see suggestions.
              </p>
              <input type='text' id='tags'></input>
            </InputBox>
            <WritingTipBox />
          </div>
          <div className='main-body-tips'></div>
        </MainBody>
      </Main>
      <div className='footer' style={{ background: 'grey' }}>
        Footer
      </div>
    </Page>
  );
}

export default AskQuestionPage;
