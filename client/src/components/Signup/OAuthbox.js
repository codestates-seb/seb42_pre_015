import axios from 'axios';
import { GoogleBtn, GithubBtn, FacebookBtn } from '../common/Buttons';
import styled from 'styled-components';

const OAuthBoxStyle = styled.div`
  .oauth-box {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    row-gap: 5px;
  }
`;

const OAuthBox = () => {
  const handleGoogleLogin = () => {
    axios
      .get('http://localhost:8080/google', { withCredentials: true })
      .then(response => {
        console.log('Google OAuth Request');
        console.log(response);
        // 액세스 토큰 저장하기
        const accessToken = response.data.accessToken;
        document.cookie = `access_token=${accessToken}; expires=${new Date(
          Date.now() + 12 * 60 * 60 * 1000
        )}; path=/`;
        // 유저 정보 가져오기
        axios
          .get('http://localhost:8080/user', {
            headers: { Authorization: `Bearer ${accessToken}` }
          })
          .then(userResponse => {
            // const user = userResponse.data;
            // 로그인 처리하기
            // ...

            // 리다이렉트하기
            window.location.href = '/';
          })
          .catch(error => alert(error));
      })
      .catch(error => alert(error));
  };

  const handleGithubLogin = () => {
    axios
      .get('http://localhost:8080/github', { withCredentials: true })
      .then(response => {
        console.log('Github OAuth Request');
        console.log(response);
        // 액세스 토큰 저장하기
        const accessToken = response.data.accessToken;
        document.cookie = `access_token=${accessToken}; expires=${new Date(
          Date.now() + 12 * 60 * 60 * 1000
        )}; path=/`;
        // 유저 정보 가져오기
        axios
          .get('http://localhost:8080/user', {
            headers: { Authorization: `Bearer ${accessToken}` }
          })
          .then(userResponse => {
            //const user = userResponse.data;
            // 로그인 처리하기
            // ...

            // 리다이렉트하기
            window.location.href = '/';
          })
          .catch(error => alert(error));
      })
      .catch(error => alert(error));
  };

  const handleFacebookLogin = () => {
    axios
      .get('http://localhost:8080/facebook', { withCredentials: true })
      .then(response => {
        console.log('Facebook OAuth Request');
        console.log(response);
        // 액세스 토큰 저장하기
        const accessToken = response.data.accessToken;
        document.cookie = `access_token=${accessToken}; expires=${new Date(
          Date.now() + 12 * 60 * 60 * 1000
        )}; path=/`;
        // 유저 정보 가져오기
        axios
          .get('http://localhost:8080/user', {
            headers: { Authorization: `Bearer ${accessToken}` }
          })
          .then(userResponse => {
            //const user = userResponse.data;
            // 로그인 처리하기
            // ...

            // 리다이렉트하기
            window.location.href = '/';
          })
          .catch(error => alert(error));
      })
      .catch(error => alert(error));
  };

  return (
    <>
      <OAuthBoxStyle>
        <div className='oauth-box'>
          <a href='http://localhost:8080/oauth2/autorization/google'>
            <GoogleBtn onClick={handleGoogleLogin} />
          </a>
          <a href='http://localhost:8080/oauth2/autorization/github'>
            <GithubBtn onClick={handleGithubLogin} />
          </a>
          <a href='http://localhost:8080/oauth2/autorization/facebook'>
            <FacebookBtn onClick={handleFacebookLogin} />
          </a>
        </div>
      </OAuthBoxStyle>
    </>
  );
};

export default OAuthBox;
