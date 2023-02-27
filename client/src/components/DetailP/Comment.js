import styled from 'styled-components';
import { SmallPenSVG } from '../../assets/CommonSVG';
// import { GeneralBtn } from '../common/Buttons';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* border-top: 1px solid #dee2e5; */
  padding: 6px;
  margin-bottom: 15px;
  > div {
    > .add-comment-btn {
      background-color: #fff;
      color: #abb1b7;
      font-size: 13px;
      &:hover {
        color: #5cb8fc;
      }
    }
  }
`;

const CommentWrapper = styled.div`
  width: 100%;
  font-size: 13px;
  margin-bottom: 8px;
  border-top: 1px solid #dee2e5;
  > .comment {
    margin-right: 3px;
    font-size: 13px;
    white-space: normal;
  }
  > .name {
    color: #0069c1;
  }
  > .date {
    color: #858e97;
  }
  > .delete-btn {
    margin-left: 3px;
    color: #858e97;
  }
`;

const AddCommentContainer = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid black;
  border-radius: 10px;
  border: 1px solid #b1b7bc;
  > input {
    height: 30px;
    width: 91%;
    border-radius: 10px;
    margin-right: 8px;
    padding: 6px;
    font-size: 13px;
    line-height: 19.5px;
    white-space: normal;
    &:focus {
      outline: none;
    }
  }
  > button {
    width: 50px;
    height: 30px;
    border-radius: 10px;
    font-size: 12px;
    color: #0069c1;
    background-color: #fff;
  }
  &:focus-within {
    border: 0.5px solid #409ad6;
    box-shadow: 0 0 0 2px #d9e9f6;
    outline: none;
  }
`;

function Comment({
  questionId,
  questionCommentData,
  setQuestionCommentData,
  answerId,
  answerCommentData,
  setAnswerCommentData
}) {
  const navigate = useNavigate();

  let init = questionCommentData || answerCommentData;

  const [isAddClicked, setIsAddClicked] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    const newCommentInput = { userId: 1, content: newComment };

    if (init === questionCommentData) {
      axios
        .post(`/question/${questionId}/comment`, newCommentInput, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Refresh: `${refreshToken}`
          }
        })
        .then(res => {
          setQuestionCommentData(res.data);
          setNewComment('');
        });
    } else if (init === answerCommentData) {
      axios
        .post(
          `/question/${questionId}/answer/${answerId}/comment`,
          newCommentInput,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Refresh: `${refreshToken}`
            }
          }
        )
        .then(res => {
          console.log('commentdata:', res);
          setAnswerCommentData(res.data);
          setNewComment('');
        });
    }
  };

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return (
    <>
      {init && (
        <CommentContainer>
          {init.map(comment => (
            <CommentWrapper
              key={
                init === questionCommentData
                  ? comment.questionCommentId
                  : comment.answerCommentId
              }
            >
              <span className='comment content'>{comment.content}</span>
              <span className='comment name'>{comment.userName}</span>
              <span className='comment date'>{comment.createdAt}</span>
              <SmallPenSVG className='comment edit-btn' />
              <span className='comment delete-btn'>X</span>
            </CommentWrapper>
          ))}
          <div>
            {!isAddClicked ? (
              <button
                className='add-comment-btn'
                onClick={
                  accessToken && refreshToken
                    ? () => setIsAddClicked(true)
                    : () => navigate('/login')
                }
              >
                Add a comment
              </button>
            ) : null}
          </div>
          {isAddClicked ? (
            <AddCommentContainer>
              <input
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
              ></input>
              <button onClick={handleAddComment}>Post</button>
            </AddCommentContainer>
          ) : null}
        </CommentContainer>
      )}
    </>
  );
}

export default Comment;
