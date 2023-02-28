import { GoogleBtn, GithubBtn, FacebookBtn } from '../common/Buttons';
import styled from 'styled-components';
// import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
//import { storge } from './Utils/store';
// import axios from 'axios';

const GITHUB_CLIEND_ID = '60f111dea1f6731bf693';
const GOOGLE_CLIEND_ID =
  '444069027831-csa77324h47k7lkeh7afopv97n35081t.apps.googleusercontent.com';

const OAuthBoxStyle = styled.div`
  .oauth-box {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    row-gap: 5px;
  }
`;

const OAuthBox = () => {
  const GitHubhandleOnClick = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIEND_ID}`;
    //storge.setData('API_TYPE', url);
  };
  const GooglehandleOnClick = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIEND_ID}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile&redirect_uri=http://localhost:3000`;
    //storge.setData('API_TYPE', url);
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
