import styled from 'styled-components';
import Vote from './Vote';
import Tag from '../common/Tag';
import ProfileCard from './ProfileCard';
import Comment from './Comment';
// import { questionCommentData } from '../../data/dummyData';
import { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionContainer = styled.div`
  display: flex;
`;

const QuestionWrapper = styled.div`
  width: calc(100% - 45px);
  > p {
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
    > a,
    span {
      color: grey;
    }
  }
`;

function Question({ questionData }) {
  const BASE_URL = 'http://localhost:3001';
  const [questionCommentData, setquestionCommentData] = useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/questionCommentData`).then(res => {
      setquestionCommentData(res.data);
    });
  }, []);

  return (
    <>
      {questionData && (
        <QuestionContainer>
          <Vote questionData={questionData} />
          <QuestionWrapper>
            <p>{questionData.content}</p>
            <Tag questionData={questionData} />
            <QuestionInfo>
              <ControlOptions>
                <div>
                  <a href='/'>Share</a>
                </div>
                <div>
                  <a href='/'>Edit</a>
                </div>
                <div>
                  <span>Delete</span>
                </div>
              </ControlOptions>
              <ProfileCard questionData={questionData} />
            </QuestionInfo>
            <Comment questionCommentData={questionCommentData} />
          </QuestionWrapper>
        </QuestionContainer>
      )}
    </>
  );
}

export default Question;
