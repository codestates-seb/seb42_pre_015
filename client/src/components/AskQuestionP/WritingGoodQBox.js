import styled from 'styled-components';

const BoxContainer = styled.div`
  width: 70%;
  min-height: 250px;
  margin: 15px 0px;
  padding: 24px;
  border: 1px solid #97c8e9;
  border-radius: 3px;
  background-color: #e6f2fa;
  color: #33383d;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > h2 {
    font-size: 21px;
    margin-bottom: 10px;
  }
  > p {
    font-size: 15px;
    flex-wrap: wrap;
    white-space: normal;
    margin-bottom: 5px;
    > a {
      font-size: 15px;
      color: #328acf;
    }
  }
  > h5 {
    font-size: 13px;
    font-weight: 600;
    padding-top: 5px;
    margin: 10px 0px;
  }
  > ul {
    list-style: disc;
    margin-left: 30px;
    > li {
      white-space: normal;
    }
  }

  @media screen and (max-width: 1050px) {
    width: 95%;
  }
`;

function WritingGoodQBox() {
  return (
    <BoxContainer>
      <h2>Writing a good question</h2>
      <p>
        You’re ready to
        <a href='https://stackoverflow.com/help/how-to-ask'> ask </a> a&nbsp;
        <a href='https://stackoverflow.com/help/on-topic'>
          programming-related question&nbsp;
        </a>
        and this form will help guide you through the process.
      </p>
      <p>
        Looking to ask a non-programming question? See&nbsp;
        <a href='https://stackexchange.com/sites#technology-traffic'>
          the topics here&nbsp;
        </a>
        to find a relevant site.
      </p>
      <h5>Steps</h5>
      <ul>
        <li>Summarize your problem in a one-line title.</li>
        <li>Describe your problem in more detail.</li>
        <li>Describe what you tried and what you expected to happen.</li>
        <li>
          Add “tags” which help surface your question to members of the
          community.
        </li>
        <li>Review your question and post it to the site.</li>
      </ul>
    </BoxContainer>
  );
}

export default WritingGoodQBox;
