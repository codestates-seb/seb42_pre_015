import styled from 'styled-components';

const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: beige;
  height: 35px;
  margin-bottom: 16px;

  > h2 {
    font-size: 19px;
  }
`;

function AnswerHeading() {
  return (
    <HeadingContainer>
      <h2>5 Answers</h2>
      <div>
        <label htmlFor='answer-sort-method-select'>Sorted by</label>
        <select name='pets' id='answer-sort-method-select'>
          <option value='dog'>Highest score (default)</option>
          <option value='cat'>Date created</option>
        </select>
      </div>
    </HeadingContainer>
  );
}

export default AnswerHeading;
