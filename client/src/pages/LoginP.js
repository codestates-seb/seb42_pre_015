import LoginBox from '../components/common/Login/LoginBox';
import styled from 'styled-components';
import Footer from '../components/common/Footer';

const LoginPageStyle = styled.div`
  background-color: #f9f9f9;
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
