import styled from 'styled-components';
import PropTypes from 'prop-types';

const LoginButtonStyle = styled.button`
  button {
    background-color: hsl(206deg 100% 52%);
    color: white;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    :hover {
      cursor: pointer;
    }
    :active {
      background-color: hsl(209deg 100% 26%);
    }
  }
`;

const LoginButton = props => {
  return (
    <LoginButtonStyle>
      <button type='submit' className={props.className} onClick={props.onClick}>
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
