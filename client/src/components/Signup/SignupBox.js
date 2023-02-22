import OAuthBox from './OAuthbox';
import Inputbox from './Inputbox';
import { SignUpSVG } from '../../assets/LoginSVG';
import styled from 'styled-components';

const BoxStyle = styled.div`
  .all-box {
    display: inline-flex;
    flex-direction: column;
    row-gap: 20px;
    width: 307.09px;
    @media (max-width: 640px) {
      width: 290px;
    }
  }
  .input-box {
    background-color: white;
    padding: 24px;
    height: 706px;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
  }
  .support-messages {
    div {
      font-size: 13px;
      margin: 10px;
      text-align: center;
      a {
        font-size: 14px;
        color: hsl(206deg 100% 40%);
        margin-left: 5px;
        :hover {
          color: hsl(206deg 100% 52%);
        }
      }
    }
  }
  .checkbox {
    white-space: pre-line;
  }
`;

const SignupBox = () => {
  return (
    <>
      <BoxStyle>
        <div className='all-box'>
          <div className='all-oauth-box'>
            <OAuthBox />
          </div>
          <div className='input-box'>
            <Inputbox />
          </div>
          <div className='support-messages'>
            <div>
              Already have an accout? <a href='/'> Log in </a>
            </div>
            <div>
              Are you an employer?
              <a href='/'>
                Sign up on Talent <SignUpSVG className='signup-icon' />
              </a>
            </div>
          </div>
        </div>
      </BoxStyle>
    </>
  );
};

export default SignupBox;
