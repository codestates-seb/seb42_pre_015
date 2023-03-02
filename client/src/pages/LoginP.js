import LoginBox from '../components/common/Login/LoginBox';
import styled from 'styled-components';

const LoginPageStyle = styled.div`
  background-color: #f1f2f3;
  .login-page {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-items: center;
    padding: 24px;
  }
`;

const LoginPage = () => {
  return (
    <>
      <LoginPageStyle>
        <div className='login-page'>
          <LoginBox />
        </div>
      </LoginPageStyle>
    </>
  );
};

export default LoginPage;
