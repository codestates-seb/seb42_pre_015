import { GithubBtn } from '../common/Buttons';
import styled from 'styled-components';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
//import { storge } from './Utils/store';
// import axios from 'axios';

const OAuthBoxStyle = styled.div`
  .oauth-box {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    row-gap: 5px;
  }
`;
// const api = {
//   google: {
//     url: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIEND_ID}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile&redirect_uri=http://localhost:3000/`
//   },
//   github: {
//     url: `https://github.com/login/oauth/authorize?client_id=b31aa149cfb2da284724`
//   }
// };

const OAuthBox = () => {
  const GitHubhandleOnClick = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=b31aa149cfb2da284724`;
    //storge.setData('API_TYPE', url);
  };

  return (
    <>
      <OAuthBoxStyle>
        <div className='oauth-box'>
          {/* <GoogleBtn onClick={handleOnClick(api.google)} /> */}
          <GithubBtn onClick={GitHubhandleOnClick} />

          <GoogleOAuthProvider clientId='444069027831-csa77324h47k7lkeh7afopv97n35081t.apps.googleusercontent.com'>
            <GoogleLogin
              buttonText='Login with Google'
              //onClick={onSuccess}
              onSuccess={res => {
                console.log(res);
                // if (res.credential !== undefined) {
                //   window.location.href = '/';
                // }
              }}
              onFailure={() => {
                console.log('error');
              }}
            />
          </GoogleOAuthProvider>
        </div>
      </OAuthBoxStyle>
    </>
  );
};

export default OAuthBox;
