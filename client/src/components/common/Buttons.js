import styled from 'styled-components';
import { GoogleSVG, GitHubSVG, FacebookSVG } from '../assets/LoginSVG';

const ButtonWrapper = styled.button`
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  border: 1px solid gainsboro;
  border-radius: 5px;
  width: 100%;
  height: ${({ height }) => height};
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 15px;
  &:hover {
    background-color: ${({ hoverBgColor }) => hoverBgColor};
  }

  ${({ isLoginButton }) =>
    isLoginButton && `box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);`}
  .span-style {
    display: inline-flex;
    align-items: center;
    font-size: 13px;
  }
`;

const GoogleBtn = () => {
  return (
    <ButtonWrapper
      bgColor='#fff'
      color='#000'
      hoverBgColor='#eee'
      activeBgColor='#ddd'
      height='42px'
    >
      <span className='span-style'>
        <GoogleSVG className='icon' />
        Log in with Google
      </span>
    </ButtonWrapper>
  );
};

const GithubBtn = () => {
  return (
    <ButtonWrapper
      bgColor='#222'
      color='#fff'
      hoverBgColor='#000'
      activeBgColor='#333'
      height='42px'
    >
      <span className='span-style'>
        <GitHubSVG className='icon' /> Log in with GitHub
      </span>
    </ButtonWrapper>
  );
};

const FacebookBtn = () => {
  return (
    <ButtonWrapper
      bgColor='#3b5998'
      color='#fff'
      hoverBgColor='#2f477a'
      activeBgColor='#293e69'
      height='42px'
    >
      <span className='span-style'>
        <FacebookSVG className='icon' /> Log in with Facebook
      </span>
    </ButtonWrapper>
  );
};

const GeneralBtn = () => {
  return (
    <ButtonWrapper
      bgColor='#0895ff'
      color='#fff'
      hoverBgColor='#2f477a'
      activeBgColor='#293e69'
      height='42px'
      isLoginButton
    >
      Log in
    </ButtonWrapper>
  );
};

export { GoogleBtn, GithubBtn, FacebookBtn, GeneralBtn };
