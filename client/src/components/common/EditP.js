import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { GeneralBtn } from './Buttons';
import TagInput from './TagInput';
import Editor from './Editor';
import 'react-quill/dist/quill.snow.css';

const QEditContainer = styled.div`
  width: 100%;
  padding: 24px;
`;
const QEHelpBox = styled.div`
  text-align: left;
  padding: 16px;
  border: 1px solid rgb(230, 207, 121);
  background-color: rgb(253, 247, 226);
  margin-bottom: ${props => props.margin || '12px'};
  > p {
    white-space: normal;
  }
`;
const QELable = styled.label`
  display: block;
  margin-bottom: ${props => props.margin || '4px'};
  font-weight: 600;
  font-size: ${props => props.fontsize || '12px'};
`;
const QEInput = styled.input`
  padding: 7.8px 9.1px;
  display: block;
  width: 100%;
  border: 1px solid rgb(186, 191, 196);
  color: rgb(12, 13, 14);
  border-radius: 3px;
  margin-bottom: 15px;
  &:focus {
    border: 1px solid ${props => (props.validated ? '#409ad6' : '#DE4F54')};
    box-shadow: ${props =>
      props.validated ? '0 0 0 4px #d9e9f6' : '0 0 0 4px #F6E0E0'};
    outline: none;
  }
`;

const QECancelBtn = styled.button`
  margin-left: 17px;
  height: 38px;
  padding: 10px;
  border-radius: 4px;
  background-color: white;
  color: #4c92d3;
  cursor: pointer;
  &:hover {
    background-color: #f0f8ff;
  }
`;
const ShowConentData = styled.div`
  margin: 30px 0 30px 0;
  p {
    white-space: normal;
  }
`;
export function QuestionEditMain() {
  const [QuestionData, setQuestionData] = useState({ content: '', tags: [] });
  const { questionId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/question/${questionId}`)
      .then(res => {
        setQuestionData(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleInputChange = event => {
    setQuestionData({ ...QuestionData, title: event.target.value || '' });
  };

  const [titleErrorMsg, setTitleErrorMsg] = useState('');
  const [contentErrorMsg, setContentErrorMsg] = useState('');
  const [tagErrorMsg, setTagErrorMsg] = useState(false);

  const handleValidation = e => {
    if (e.target.name === 'title') {
      if (QuestionData.title.length > 0 && QuestionData.title.length < 15) {
        setTitleErrorMsg('Title must be at least 15 characters.');
      } else if (QuestionData.title.length === 0) {
        setTitleErrorMsg('Title is missing.');
      } else {
        setTitleErrorMsg(false);
      }
    }

    if (e.target.className.includes('ql-editor')) {
      if (QuestionData.content.length > 0 && QuestionData.content.length < 20) {
        setContentErrorMsg('Body must be at least 20 characters.');
      } else if (QuestionData.content.length === 0) {
        setContentErrorMsg('Body is missing.');
      } else {
        setContentErrorMsg('');
      }
    }

    if (e.target.name === 'tags') {
      if (!QuestionData.tags.length) {
        setTagErrorMsg('Please enter at least one tag.');
      } else {
        setTagErrorMsg('');
      }
    }
  };

  return (
    <QEditContainer>
      <QEHelpBox>
        <p style={{ marginBottom: '13px' }}>
          Your edit will be placed in a queue until it is peer reviewed.
        </p>
        <p>
          We welcome edits that make the post easier to understand and more
          valuable for readers. Because community members review edits, please
          try to make the post substantially better than how you found it, for
          example, by fixing grammar or adding additional resources and
          hyperlinks.
        </p>
      </QEHelpBox>

      <QELable htmlFor='Title'>Title</QELable>

      <QEInput
        placeholder='How to avoid sending a brunch of requests to update data in DB'
        id='title'
        value={QuestionData.title}
        onChange={handleInputChange}
        onBlur={handleValidation}
        name='title'
        validated={!titleErrorMsg}
      ></QEInput>
      {titleErrorMsg && <p style={{ color: '#DE4F54' }}>{titleErrorMsg}</p>}
      <QELable htmlFor='body'>Body</QELable>
      <Editor
        editorInput={QuestionData.content}
        setEditorInput={setQuestionData}
        formValues={QuestionData}
        handleValidation={handleValidation}
        contentErrorMsg={contentErrorMsg}
      />
      {contentErrorMsg && <p style={{ color: '#DE4F54' }}>{contentErrorMsg}</p>}
      <ShowConentData
        dangerouslySetInnerHTML={{
          __html: QuestionData.content
        }}
      />
      <QELable htmlFor='tags'>Tags</QELable>

      <TagInput
        id='tags'
        placeholder='e.g. (vba css json)'
        tags={QuestionData.tags}
        formValues={QuestionData}
        setFormValues={setQuestionData}
        handleValidation={handleValidation}
        tagErrorMsg={tagErrorMsg}
      />
      {tagErrorMsg && <p style={{ color: '#DE4F54' }}>{tagErrorMsg}</p>}
      <div style={{ marginBottom: '12px', marginTop: '12px' }}>
        <GeneralBtn
          width={'80px'}
          BtnText='Save edits'
          onClick={() => {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            const data = {
              title: QuestionData.title,
              content: QuestionData.content,
              tags: QuestionData.tags
            };
            axios
              .patch(`/question/${questionId}`, data, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  Refresh: `${refreshToken}`
                }
              })
              .then(() => {
                window.location.href = `/question/${questionId}`;
              })
              .catch(err => {
                if (err.response.status === 401) {
                  const newAccessToken = err.response.headers.authorization;
                  const newRefreshToken = err.response.headers.refresh;

                  localStorage.removeItem('accessToken');
                  localStorage.removeItem('refreshToken');

                  localStorage.setItem('accessToken', newAccessToken);
                  localStorage.setItem('refreshToken', newRefreshToken);

                  axios
                    .patch(`/question/${questionId}`, data, {
                      headers: {
                        Authorization: `Bearer ${newAccessToken}`,
                        Refresh: `${newRefreshToken}`
                      }
                    })
                    .then(() => {
                      window.location.href = `/question/${questionId}`;
                    })
                    .catch(err => {
                      console.error(err);
                      console.log('삭제를 실패했습니다.');
                    });
                }
              });
          }}
        ></GeneralBtn>
        <QECancelBtn
          onClick={() => {
            navigate(`/question/${questionId}`);
          }}
        >
          Cancel
        </QECancelBtn>
      </div>
    </QEditContainer>
  );
}

export function AnswerEditMain() {
  const [AllAnswerData, AllsetAnswerData] = useState([]);
  const [answer, setAnswer] = useState(null);
  const [contentErrorMsg, setContentErrorMsg] = useState('');
  const { questionId, answerId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/question/${questionId}/answer`)
      .then(res => {
        AllsetAnswerData(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const filteredAnswer = AllAnswerData.find(el => {
      return el.answerId === parseInt(answerId);
    });
    setAnswer(filteredAnswer);
  }, [AllAnswerData, answerId]);

  if (!answer) {
    return <div>Loading...</div>;
  }

  const handleValidation = e => {
    if (e.target.className.includes('ql-editor')) {
      if (answer.content.length > 0 && answer.content.length < 20) {
        setContentErrorMsg('Body must be at least 20 characters.');
      } else if (answer.content.length === 0) {
        setContentErrorMsg('Body is missing.');
      } else {
        setContentErrorMsg('');
      }
    }
  };
  return (
    <QEditContainer>
      <QEHelpBox margin='20px'>
        <p style={{ marginBottom: '13px' }}>
          Your edit will be placed in a queue until it is peer reviewed.
        </p>
        <p>
          We welcome edits that make the post easier to understand and more
          valuable for readers. Because community members review edits, please
          try to make the post substantially better than how you found it, for
          example, by fixing grammar or adding additional resources and
          hyperlinks.
        </p>
      </QEHelpBox>
      <QELable htmlFor='Answer' fontsize='17px' margin='14px'>
        Answer
      </QELable>
      <Editor
        editorInput={answer.content}
        setEditorInput={setAnswer}
        formValues={answer}
        handleValidation={handleValidation}
        contentErrorMsg={contentErrorMsg}
      />
      {contentErrorMsg && <p style={{ color: '#DE4F54' }}>{contentErrorMsg}</p>}
      <ShowConentData
        dangerouslySetInnerHTML={{
          __html: answer.content
        }}
      />
      <div style={{ marginBottom: '12px' }}>
        <GeneralBtn
          width={'80px'}
          BtnText='Save edits'
          padding='0px'
          onClick={() => {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            const data = { content: answer.content };
            axios
              .patch(`/question/${questionId}/answer/${answerId}`, data, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  Refresh: `${refreshToken}`
                }
              })
              .then(() => {
                window.location.href = `/question/${questionId}`;
              })
              .catch(err => {
                if (err.response.status === 401) {
                  const newAccessToken = err.response.headers.authorization;
                  const newRefreshToken = err.response.headers.refresh;

                  localStorage.removeItem('accessToken');
                  localStorage.removeItem('refreshToken');

                  localStorage.setItem('accessToken', newAccessToken);
                  localStorage.setItem('refreshToken', newRefreshToken);

                  axios
                    .patch(`/question/${questionId}/answer/${answerId}`, data, {
                      headers: {
                        Authorization: `Bearer ${newAccessToken}`,
                        Refresh: `${newRefreshToken}`
                      }
                    })
                    .then(() => {
                      window.location.href = `/question/${questionId}`;
                    })
                    .catch(err => {
                      console.error(err);
                      console.log('삭제를 실패했습니다.');
                    });
                }
              });
          }}
        ></GeneralBtn>
        <QECancelBtn
          onClick={() => {
            navigate(`/question/${questionId}`);
          }}
        >
          Cancel
        </QECancelBtn>
      </div>
    </QEditContainer>
  );
}
