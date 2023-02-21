import styled from 'styled-components';
import { GoogleSVG, GitHubSVG, FacebookSVG } from '../../assets/LoginSVG';

const ButtonWrapper = styled.button`
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  border: 1px solid rgba(0, 0, 0, 0);
  padding: 10.4px;
  border-radius: 3px;
  width: 100%;
  height: ${({ height }) => height};
  cursor: pointer;
  font-size: 13px;
  &:hover {
    background-color: ${({ hoverBgColor }) => hoverBgColor};
  }
  ${({ GeneralBtnShadow }) =>
    GeneralBtnShadow &&
    `box-shadow: rgba(255, 255,255, 0.4) 0px 1px 0px 0px inset;`}
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
      height='38px'
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
      height='38px'
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
      height='38px'
    >
      <span className='span-style'>
        <FacebookSVG className='icon' /> Log in with Facebook
      </span>
    </ButtonWrapper>
  );
};

const GeneralBtn = ({ BtnText = 'Log in', bgColor, height }) => {
  return (
    <ButtonWrapper
      bgColor={bgColor || 'rgb(10, 149, 255)'}
      color='rgb(255, 255, 255)'
      hoverBgColor='#2f477a'
      activeBgColor='#293e69'
      height={height || '38px'}
      GeneralBtnShadow
    >
      {BtnText}
    </ButtonWrapper>
  );
};

export { GoogleBtn, GithubBtn, FacebookBtn, GeneralBtn };
