import styled from 'styled-components';

const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 35px;
  margin-bottom: 15px;

  > h2 {
    font-size: 22px;
  }
`;

function AnswerHeading({ answerData }) {
  return (
    <>
      {answerData && (
        <HeadingContainer>
          <h2>{answerData.length} Answers</h2>
          <div>
            <label htmlFor='answer-sort-method-select'>Sorted by</label>
            <select name='pets' id='answer-sort-method-select'>
              <option value='dog'>Highest score (default)</option>
              <option value='cat'>Date created</option>
            </select>
          </div>
        </HeadingContainer>
      )}
    </>
  );
}

export default AnswerHeading;
