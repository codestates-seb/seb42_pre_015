import styled from 'styled-components';
import { useState } from 'react';
import CapchaLogo from '../../assets/Signup/CapchaLogo.png';

const CaptchaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f9f9f9;
  border-radius: 3px;
  border: 1px solid rgb(227, 230, 232);
  height: 110px;
  box-shadow: 0 10px 24px hsla(0, 0%, 0%, 0.05),
    0 20px 48px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.1);
`;
const CaptchaForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const CheckBoxNone = styled.input`
  display: none; /* 기존 check 박스 숨기기 */
`;

const CheckBox = styled.label`
  display: inline-block;
  position: relative;
  right: 35px;
  top: 30px;
  cursor: pointer;
  &:before {
    content: '';
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 5px;
    background-color: #fff;
    border: 2px solid #ccc;
  }

  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    left: 12.5px;
    top: 5px;
    width: 15px;
    height: 20px;
    border: solid white;
    border-width: 0 5px 5px 0;
    transform: rotate(45deg);
  }

  &:hover:before {
    border-color: #8bc34a;
  }
  input:checked + &:before {
    background-color: #8bc34a;
    border-color: #8bc34a;
  }
`;
const Messages = styled.div`
  .message {
    position: relative;
    white-space: pre-line;
    margin-top: 40px;
    margin-bottom: 40px;
    left: 30px;
    font-size: 12px;
    width: 200px;
    .Opt-in-checkbox {
      position: absolute;
      left: -20px;
    }
  }
`;
const Text = styled.div`
  font-size: 17px;
  position: relative;
  bottom: 15px;
  left: 40px;
`;
const CaptchaLogoImg = styled.img`
  width: 120px;
  height: 40px;
  position: relative;
  bottom: 10px;
  left: 30px;
`;

const Captcha = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <CaptchaContainer>
        <CaptchaForm>
          <div className='Captcha-box'>
            <CheckBoxNone
              type='checkbox'
              id='captchaCheckbox'
              checked={isChecked}
              onChange={handleCheckboxClick}
            />
            <CheckBox htmlFor='captchaCheckbox'></CheckBox>
            <Text>I&apos;m not a robot</Text>
            <CaptchaLogoImg src={CapchaLogo} alt='CapchaLogo' />
          </div>
        </CaptchaForm>
      </CaptchaContainer>

      <Messages>
        <div className='message'>
          <input type='checkbox' className='Opt-in-checkbox' />
          Opt-in to receive occasional product updates, user research
          invitations, company announcements, and digests.
        </div>
      </Messages>
    </>
  );
};

export default Captcha;
