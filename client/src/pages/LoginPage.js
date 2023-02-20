import LoginBox from '../components/Login/LoginBox';
import styled from 'styled-components';
import Footer from '../components/Login/Footer';

const LoginPageStyle = styled.div`
  background-color: hsl(27, 100%, 97%);
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
      <Footer />
    </>
  );
};

export default LoginPage;
