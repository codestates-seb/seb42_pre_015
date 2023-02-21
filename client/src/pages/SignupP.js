import styled from 'styled-components';
import SignupBox from '../components/Signup/SignupBox';
import SignupText from '../components/Signup/SignupText';
import Header from '../components/common/Header/Header';
const AllBoxStyle = styled.div`
  background-color: #f9f9f9;
  body {
    height: 100%;
  }
`;

const ContainerStyle = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 0.4fr;
  padding: 60px;

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
          <Header />
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
