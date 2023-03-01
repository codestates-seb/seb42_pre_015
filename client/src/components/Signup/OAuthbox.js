import { GoogleBtn, GithubBtn, FacebookBtn } from '../common/Buttons';
import styled from 'styled-components';
// import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
// import axios from 'axios';

const OAuthBoxStyle = styled.div`
  .oauth-box {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    row-gap: 5px;
  }
`;
const accessToken = 'sjdkfsldkfjalkejflsdkfjsdlk';
const refreshToken = 'dfjkasldfjsdlakfjldksafjl';

const OAuthBox = () => {
  const GitHubhandleOnClick = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUBID}`;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  };
  const GooglehandleOnClick = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLEID}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile&redirect_uri=http://localhost:3000`;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  };
  const FacebookhandleOnClick = () => {
    alert('준비중인 로그인 서비스입니다.');
  };
  // 주석
  return (
    <>
      <OAuthBoxStyle>
        <div className='oauth-box'>
          <GoogleBtn onClick={GooglehandleOnClick} />
          <GithubBtn onClick={GitHubhandleOnClick} />
          <FacebookBtn onClick={FacebookhandleOnClick} />
        </div>
      </OAuthBoxStyle>
    </>
  );
};

export default OAuthBox;
