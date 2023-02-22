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
  return (
    <>
      <OAuthBoxStyle>
        <div className='oauth-box'>
          <GoogleBtn />
          <GithubBtn />
          <FacebookBtn />
        </div>
      </OAuthBoxStyle>
    </>
  );
};

export default OAuthBox;
