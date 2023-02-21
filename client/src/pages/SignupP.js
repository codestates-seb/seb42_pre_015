import styled from 'styled-components';
import SignupBox from '../components/Signup/SignupBox';
import SignupText from '../components/Signup/SignupText';
const AllBoxStyle = styled.div`
  background-color: #f9f9f9;
  body {
    display: grid;
    grid-template-rows: 40px 1fr;
    height: 100%;
  }
  header {
    background-color: pink;
    height: 40px;
  }
`;

const ContainerStyle = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 0.4fr;
  padding: 30px;

  .container-left {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column-start: 1;
  }
  .container-right {
    display: flex;
    justify-content: center;
    grid-column-start: 2;
  }
`;

const SignupP = () => {
  return (
    <>
      <AllBoxStyle>
        <body>
          <header>header</header>
          <ContainerStyle>
            <div className='container-left'>
              <SignupText className='text-box' />
            </div>
            <div className='container-right'>
              <SignupBox className='signup-box' />
            </div>
          </ContainerStyle>
        </body>
      </AllBoxStyle>
    </>
  );
};

export default SignupP;
