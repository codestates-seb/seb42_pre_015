import styled from 'styled-components';
import { SmallPenSVG } from '../../assets/CommonSVG';
import { GeneralBtn } from '../common/Buttons';
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
  > textarea {
    height: 50px;
    width: 85%;
    border-radius: 3px;
    margin-right: 8px;
    padding: 6px;
    font-size: 13px;
    line-height: 19.5px;
    white-space: normal;
    border: 1px solid #b1b7bc;
    &:focus {
      border: 1px solid #409ad6;
      box-shadow: 0 0 0 4px #d9e9f6;
      outline: none;
    }
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
        .post(`/question/${questionId}/comment`, newCommentInput)
        .then(res => {
          console.log('commentdata:', res.data);
          setQuestionCommentData(res.data);
          setNewComment('');
        });
    } else if (init === answerCommentData) {
      console.log('newcommentinput:', newCommentInput);
      console.log('questionId:', questionId);
      console.log('answerId:', answerId);
      axios
        .post(
          `/question/${questionId}/answer/${answerId}/comment`,
          newCommentInput
        )
        .then(res => {
          console.log('commentdata:', res.data);
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
              {/* Show this only when the user has the authorization. */}
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
              <textarea
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
              />
              <GeneralBtn
                BtnText='Add Comment'
                width='110px'
                height='40px'
                onClick={handleAddComment}
              />
            </AddCommentContainer>
          ) : null}
        </CommentContainer>
      )}
    </>
  );
}

export default Comment;
