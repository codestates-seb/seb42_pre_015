// 기본폴더 추가
import LoginBox from '../components/Login/LoginBox';
import styled from 'styled-components';

const LoginPageStyle = styled.div`
  background-color: hsl(27, 100%, 97%);
`;

const LoginPage = () => {
  return (
    <>
      <LoginPageStyle>
        <div className='header'>
          <div className='LoginBox'>
            <LoginBox />
          </div>
        </div>
      </LoginPageStyle>
    </>
  );
};

export default LoginPage;
