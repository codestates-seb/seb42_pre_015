import styled from 'styled-components';
import { TextSVG1, TextSVG2, TextSVG3, TextSVG4 } from '../../assets/SignupSVG';
const TextStyle = styled.div`
  .text-box {
    width: max-content;
    height: 300px;
    background-color: #f9f9f9;
    margin-left: 150px;
    > h1 {
      font-size: 30px;
      text-align: right;
    }
    > div {
      margin-top: 20px;
      margin-left: 10px;
      font-size: 17px;
      > p {
        font-size: 14px;
      }
    }
  }
`;

const SignupText = () => {
  return (
    <>
      <TextStyle>
        <div className='text-box'>
          <h1> Join the Stack Overflow community</h1>
          <div>
            <TextSVG1 /> Get unstuck - ask a question
          </div>
          <div>
            <TextSVG2 />
            Unlock new privileges like voting and commenting
          </div>
          <div>
            <TextSVG3 />
            Save your favorite tags, filters, and jobs
          </div>
          <div>
            <TextSVG4 />
            Earn reputation and badges
          </div>
          <div>
            <p>
              Collaborate and share knowledge with a private group for FREE.
              <br />
              <a href='/' style={{ color: '#0895ff' }}>
                Get Stack Overflow for Teams free for up to 50 users.
              </a>
            </p>
          </div>
        </div>
      </TextStyle>
    </>
  );
};
export default SignupText;
