import styled from 'styled-components';

const CaptchaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: red;
`;
const CaptchaForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const CaptchaInput = styled.input`
  margin: 20px 0;
  padding: 10px;
`;
const Captcha = () => {
  return (
    <>
      <CaptchaContainer>
        <CaptchaForm>
          <div>
            <CaptchaInput type={'checkbox'} /> I&apos;m not a robot
          </div>
        </CaptchaForm>
        <div>reCAPTCHA</div>
      </CaptchaContainer>
      <div className='checkbox'>
        <input type={'checkbox'} />
        Opt-in to receive occasional product updates, user research invitations,
        company announcements, and digests.
      </div>
    </>
  );
};

export default Captcha;
