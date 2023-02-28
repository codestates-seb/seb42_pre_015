import styled from 'styled-components';
import WritingTipBox from '../components/AskQuestionP/WritingTipBox';
import WritingGoodQBox from '../components/AskQuestionP/WritingGoodQBox';
import { ReactComponent as AskQuestionBackground } from '../assets/askquestion-background.svg';
import { useState } from 'react';
import TagInput from '../components/common/TagInput';
import Footer from '../components/common/Footer';
import { GeneralBtn } from '../components/common/Buttons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Editor from '../components/common/Editor';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 53px 5px 0px 5px;
`;

const MainHeading = styled.div`
  width: 85%;
  height: 410px;
  display: flex;
  flex-direction: column;
  > .main-heading-title {
    height: 130px;
    display: flex;
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

// ! flex나 grid로 통일해야함!
const MainBody = styled.form`
  width: 85%;
  display: flex;
  flex-direction: column;
  > .form {
    display: flex;
    margin-bottom: 15px;
  }

  @media screen and (max-width: 1050px) {
    width: 100%;
    > .form {
      display: flex;
      flex-direction: column-reverse;
      width: 95%;
    }
  }
`;

const DisabledBtn = styled.button`
  width: 140px;
  background-color: #77c4fd;
  color: rgb(255, 255, 255);
  border-radius: 3px;
  font-size: 13px;
`;

const InputBox = styled.div`
  width: 70%;
  border: 1.5px solid #e0e2e5;
  border-radius: 3px;
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
    white-space: normal;
  }
  > input {
    border: 1px solid #ced2d5;
    border-radius: 3px;
    width: 100%;
    padding: 7.8px 9.1px;
    font-size: 13px;
    &:focus {
      border: 1px solid ${props => (props.validated ? '#409ad6' : '#DE4F54')};
      box-shadow: ${props =>
        props.validated ? '0 0 0 4px #d9e9f6' : '0 0 0 4px #F6E0E0'};
      outline: none;
    }
  }

  @media screen and (max-width: 1050px) {
    width: 100%;
  }
`;

const Buttons = styled.div`
  width: 70%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 15px;
  > button {
    margin-right: 10px;
  }
`;

function AskQuestionPage() {
  const navigate = useNavigate();
  // Writing Tip Box 팝업을 위한 상태
  const [isClicked, setIsClicked] = useState(null);

  const [formValues, setFormValues] = useState({
    title: '',
    content: '',
    tags: []
  });

  // const handleEditForm = e => {
  //   const { name, value } = e.target;
  //   setFormValues({ ...formValues, [name]: value });
  // };

  const handleSubmit = e => {
    e.preventDefault();

    const newQuestion = { userId: 1, ...formValues };

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    axios
      .post('/question', newQuestion, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Refresh: `${refreshToken}`
        }
      })
      .then(res => {
        navigate(`/question/${res.data.questionId}`);
      });
  };

  const handleDiscard = () => {
    setFormValues({ title: '', content: '', tags: [] });
    navigate('/');
  };

  // 유효성 검사
  const [titleErrorMsg, setTitleErrorMsg] = useState('');
  const [contentErrorMsg, setContentErrorMsg] = useState('');
  const [tagErrorMsg, setTagErrorMsg] = useState(false);

  const handleValidation = e => {
    const { title, content, tags } = formValues;
    console.log('formValues:', formValues.tags.length);
    if (e.target.name === 'title') {
      if (title.length > 0 && title.length < 15) {
        setTitleErrorMsg('Title must be at least 15 characters.');
      } else if (title.length === 0) {
        setTitleErrorMsg('Title is missing.');
      } else {
        setTitleErrorMsg(false);
      }
    }

    if (e.target.className.includes('ql-editor')) {
      if (content.length > 0 && content.length < 20) {
        setContentErrorMsg('Body must be at least 20 characters.');
      } else if (content.length === 0) {
        setContentErrorMsg('Body is missing.');
      } else {
        setContentErrorMsg('');
      }
    }

    if (e.target.name === 'tags') {
      if (!tags.length) {
        setTagErrorMsg('Please enter at least one tag.');
      } else {
        setTagErrorMsg('');
      }
    }
  };

  return (
    <>
      <Main>
        <MainHeading>
          <div className='main-heading-title'>
            <h1>Ask a public question</h1>
            <AskQuestionBackground className='ask-question-background' />
          </div>
          <WritingGoodQBox />
        </MainHeading>
        <MainBody onSubmit={handleSubmit}>
          <div className='form form-title'>
            <InputBox
              onClick={() => setIsClicked('titleClicked')}
              validated={!titleErrorMsg}
            >
              <label htmlFor='title'>Title</label>
              <p>
                Be specific and imagine you’re asking a question to another
                person.
              </p>
              <input
                type='text'
                name='title'
                placeholder='e.g. Is there an R function for finding the index of an element in a vector?'
                value={formValues.title}
                onChange={e =>
                  setFormValues({ ...formValues, title: e.target.value })
                }
                onBlur={handleValidation}
              ></input>
              {titleErrorMsg && (
                <p style={{ color: '#DE4F54' }}>{titleErrorMsg}</p>
              )}
            </InputBox>
            {isClicked === 'titleClicked' ? (
              <WritingTipBox
                title='Writing a good title'
                content='Your title should summarize the problem.'
              />
            ) : null}
          </div>
          <div className='form form-content'>
            <InputBox
              name='title'
              onClick={() => setIsClicked('contentClicked')}
              validated={!contentErrorMsg}
            >
              <label htmlFor='content'>
                What are the details of your problem?
              </label>
              <p>
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </p>
              <Editor
                editorInput={formValues.content}
                formValues={formValues}
                setEditorInput={setFormValues}
                handleValidation={handleValidation}
                contentErrorMsg={contentErrorMsg}
              />
              {contentErrorMsg && (
                <p style={{ color: '#DE4F54' }}>{contentErrorMsg}</p>
              )}
            </InputBox>
            {isClicked === 'contentClicked' ? (
              <WritingTipBox
                title={'Introduce the problem'}
                content={
                  'Explain how you encountered the problem you’re trying to solve, and any difficulties that have prevented you from solving it yourself.'
                }
              />
            ) : null}
          </div>
          <div className='form form-tags'>
            <InputBox onClick={() => setIsClicked('tagsClicked')}>
              <label htmlFor='tags'>Tag</label>
              <p>Add up to 5 tags to describe what your question is about.</p>
              <TagInput
                tags={formValues.tags}
                formValues={formValues}
                setFormValues={setFormValues}
                handleValidation={handleValidation}
                tagErrorMsg={tagErrorMsg}
              />
              {tagErrorMsg && <p style={{ color: '#DE4F54' }}>{tagErrorMsg}</p>}
            </InputBox>
            {isClicked === 'tagsClicked' ? (
              <WritingTipBox
                title={'Adding tags'}
                content={
                  'Tags help ensure that your question will get attention from the right people.'
                }
              />
            ) : null}
          </div>
          <Buttons>
            {titleErrorMsg || contentErrorMsg || tagErrorMsg ? (
              <DisabledBtn>Post a question</DisabledBtn>
            ) : (
              <GeneralBtn
                type='submit'
                BtnText='Post your question'
                width={'140px'}
                onClick={handleValidation}
              >
                Post your question
              </GeneralBtn>
            )}

            <GeneralBtn
              type='discard'
              className='discard-btn'
              BtnText='Discard draft'
              width='100px'
              onClick={handleDiscard}
            />
          </Buttons>
        </MainBody>
      </Main>
      <Footer />
    </>
  );
}

export default AskQuestionPage;
