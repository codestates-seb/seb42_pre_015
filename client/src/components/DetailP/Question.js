import styled from 'styled-components';
import Vote from './Vote';
import Tag from '../common/Tag';
import ProfileCard from './ProfileCard';
import Comment from './Comment';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuestionContainer = styled.div`
  display: flex;
`;

const QuestionWrapper = styled.div`
  width: calc(100% - 45px);
  > p > p {
    white-space: normal;
    font-size: 15px;
    line-height: 22.5px;
    margin-bottom: 24px;
  }
`;

const QuestionInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 24px 0px;
`;

const ControlOptions = styled.div`
  display: flex;
  width: 100px;
  justify-content: space-between;
  > div {
    > .controller-btn {
      color: grey;
      background-color: #fff;
    }
  }
`;

function Question({ questionId, questionData }) {
  const navigate = useNavigate();

  const [questionCommentData, setQuestionCommentData] = useState(null);

  useEffect(() => {
    axios.get(`/question/${questionId}/comments`).then(res => {
      setQuestionCommentData(res.data);
    });
  }, [questionId]);

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return (
    <>
      {questionData && (
        <QuestionContainer>
          <Vote questionData={questionData} questionId={questionId} />
          <QuestionWrapper>
            <p dangerouslySetInnerHTML={{ __html: questionData.content }}>
              {/* {questionData.content} */}
            </p>
            <Tag tags={questionData.tags} />
            <QuestionInfo>
              <ControlOptions>
                <div>
                  <button className='controller-btn' href='/'>
                    Share
                  </button>
                </div>
                <div>
                  <button
                    className='controller-btn'
                    onClick={() =>
                      accessToken && refreshToken
                        ? navigate(`/question/${questionId}/questionedit`)
                        : navigate('/login')
                    }
                  >
                    Edit
                  </button>
                </div>
                <div>
                  <button className='controller-btn'>Delete</button>
                </div>
              </ControlOptions>
              <ProfileCard questionData={questionData} />
            </QuestionInfo>
            <Comment
              questionId={questionId}
              questionCommentData={questionCommentData}
              setQuestionCommentData={setQuestionCommentData}
            />
          </QuestionWrapper>
        </QuestionContainer>
      )}
    </>
  );
}

export default Question;
