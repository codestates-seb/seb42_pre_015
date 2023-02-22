import styled from 'styled-components';
import { GoogleSVG, GitHubSVG, FacebookSVG } from '../../assets/LoginSVG';

const ButtonWrapper = styled.button`
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  border: 1px solid rgba(0, 0, 0, 0);
  padding: 10.4px;
  border-radius: 3px;
  width: ${({ width }) => width};
  height: 38px;
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

const GoogleBtn = ({ onClick }) => {
  return (
    <ButtonWrapper
      bgColor='#fff'
      color='#000'
      hoverBgColor='#eee'
      width='100%'
      onClick={onClick}
    >
      <span className='span-style'>
        <GoogleSVG className='icon' />
        Log in with Google
      </span>
    </ButtonWrapper>
  );
};

const GithubBtn = ({ onClick }) => {
  return (
    <ButtonWrapper
      bgColor='#222'
      color='#fff'
      hoverBgColor='#000'
      width='100%'
      onClick={onClick}
    >
      <span className='span-style'>
        <GitHubSVG className='icon' /> Log in with GitHub
      </span>
    </ButtonWrapper>
  );
};

const FacebookBtn = ({ onClick }) => {
  return (
    <ButtonWrapper
      bgColor='#3b5998'
      color='#fff'
      hoverBgColor='#2f477a'
      width='100%'
      onClick={onClick}
    >
      <span className='span-style'>
        <FacebookSVG className='icon' /> Log in with Facebook
      </span>
    </ButtonWrapper>
  );
};

// On = blue , Off = grey?

const GeneralBtn = ({ BtnText = 'Fill Text', type, width, onClick }) => {
  let bgColor, color, hoverBgColor;
  if (type === 'off') {
    bgColor = 'rgb(225, 236, 244)';
    color = 'rgb(57, 115, 157)';
    hoverBgColor = '#b3d3ea';
    // on
  } else if (type === 'discard') {
    bgColor = '#fff';
    color = '#A92329';
    hoverBgColor = '#FEF0F0';
  } else {
    bgColor = 'rgb(10, 149, 255)';
    color = 'rgb(255, 255, 255)';
    hoverBgColor = '#0069C1';
  }

  return (
    <ButtonWrapper
      bgColor={bgColor}
      color={color}
      hoverBgColor={hoverBgColor}
      width={width || '100%'}
      GeneralBtnShadow
      onClick={onClick}
    >
      {BtnText}
    </ButtonWrapper>
  );
};

export { GoogleBtn, GithubBtn, FacebookBtn, GeneralBtn };
