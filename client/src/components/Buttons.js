import styled from 'styled-components';
import PropTypes from 'prop-types';

const LoginButtonStyle = styled.button`
  button {
    background-color: hsl(206deg 100% 52%);
    color: white;
    border-radius: 5px;
  }
`;

const LoginButton = props => {
  return (
    <LoginButtonStyle>
      <button className={props.className} onClick={props.onClick}>
        Log in
      </button>
    </LoginButtonStyle>
  );
};
LoginButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default LoginButton;
