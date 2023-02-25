import styled from 'styled-components';
import { GeneralBtn } from './Buttons';
import TagInput from './TagInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

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
const QEAtag = styled.a`
  color: rgb(131, 141, 149);
`;
const StyledReactQuill = styled(ReactQuill)`
  height: 284px;
  margin-bottom: 50px;
  .ql-editor {
    height: 100%;
  }
`;
const ShowConentData = styled.div`
  margin: 70px 0 30px 0;
  p {
    white-space: normal;
  }
`;
export function QuestionEditMain() {
  const [QuestionData, setQuestionData] = useState([]);
  const [QuestionInputData, setQuestionInputData] = useState('');
  const [title, setTilte] = useState('');
  const { questionId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/question/${questionId}`)
      // 찐은 `/question/${questionId}` 임.
      .then(res => {
        setQuestionData(res.data);
        setTilte(res.data.title);
        setQuestionInputData(res.data.content);
        console.log('질문겟해옴ㅋㅋ');
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  console.log(QuestionData);
  const handleInputChange = event => {
    setTilte(event.target.value || '');
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
        value={title}
        onChange={handleInputChange}
      ></QEInput>
      <QELable htmlFor='body'>Body</QELable>
      <Editor
        QuestionInputData={QuestionInputData}
        setQuestionInputData={setQuestionInputData}
      />
      <ShowConentData
        dangerouslySetInnerHTML={{
          __html: QuestionInputData
        }}
      />
      <QELable htmlFor='tags'>Tags</QELable>
      <TagInput id='tags' placeholder='e.g. (vba css json)' />
      <div style={{ marginBottom: '12px', marginTop: '12px' }}>
        <GeneralBtn
          width={'80px'}
          BtnText='Save edits'
          onClick={() => {
            const data = {
              title: title,
              content: QuestionInputData,
              tags: ['ab', 'ba']
            };
            axios
              .patch(`/question/${questionId}`, data)
              .then(response => {
                console.log(response.data);
              })
              .catch(error => {
                console.error(error.response);
              });
            navigate(`/question/${questionId}`);
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
      <QEAtag href='/#'>Add a comment</QEAtag>
    </QEditContainer>
  );
}

function Editor({ QuestionInputData, setQuestionInputData }) {
  const handleText = content => {
    setQuestionInputData(content);
  };

  return <StyledReactQuill value={QuestionInputData} onChange={handleText} />;
}

export default Editor;

export function AnswerEditMain() {
  const [AllAnswerData, AllsetAnswerData] = useState([]);
  const [AnswerInputData, setAnswerInputData] = useState('');
  const [answer, setAnswer] = useState(null);
  const { questionId, answerId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/question/${questionId}/answer`)
      .then(res => {
        AllsetAnswerData(res.data);
        console.log('엑시오스받음');
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

  useEffect(() => {
    if (answer) {
      setAnswerInputData(answer.content);
    }
  }, [answer]);
  console.log(AnswerInputData);
  if (!answer) {
    return <div>Loading...</div>;
  }

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
        QuestionInputData={AnswerInputData}
        setQuestionInputData={setAnswerInputData}
      />
      <ShowConentData
        dangerouslySetInnerHTML={{
          __html: AnswerInputData
        }}
      />
      <div style={{ marginBottom: '12px' }}>
        <GeneralBtn
          width={'80px'}
          BtnText='Save edits'
          padding='0px'
          onClick={() => {
            const data = { content: AnswerInputData };
            axios
              .patch(`/question/${questionId}/answer/${answerId}`, data)
              .then(response => {
                console.log(response.data);
              })
              .catch(error => {
                console.error(error.response);
              });
            navigate(`/question/${questionId}`);
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
      <QEAtag href='/#'>Add a comment</QEAtag>
    </QEditContainer>
  );
}
