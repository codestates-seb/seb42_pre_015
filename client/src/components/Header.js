import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import HeaderLogo from '../assets/Header/HeaderLogo.JPG';
import UserNav from './Header/UserNav';
import ProductsNav from './Header/ProductsNav';
import Search from './Header/Search';
import LoginNav from './Header/LoginNav';
import StackOverflowMini from '../assets/Header/StackOverflowMini.png';
import HamburgerIcon from '../assets/Header/HamburgerIcon.png';

const StyledHeader = styled.div`
  top: 3px;
  width: 100%;
  height: 50px;
  background-color: #f8f9f9;
  position: fixed;
  z-index: 10;
  margin: 0 auto;
`;

const HeaderLine = styled.div`
  position: fixed;
  width: 100%;
  height: 3px;
  background-color: #f48225;
`;

const HeaderContainer = styled.div`
  max-width: 100%;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  align-items: center;
`;
const HeaderLogoImg = styled.img`
  width: 150px;
  height: 30px;
  margin-top: -4px;
  padding: 0 8px;
  cursor: pointer;
  @media (max-width: 640px) {
    display: none;
  }
`;
const HeaderLogoImgMini = styled.img`
  display: none;
  @media (max-width: 640px) {
    display: block;
    width: 25px;
    height: 25px;
    margin-top: -4px;
    margin: 0 10px;
    cursor: pointer;
  }
`;
const NavigationBtn = styled.button`
  position: relative;
  cursor: pointer;
  font-size: 13px;
  color: rgb(82, 89, 96);
  padding: 6px 12px;
  display: flex;
  align-items: center;
  border-radius: 1000px;
  background-color: rgb(0, 0, 0, 0);
  &:hover {
    background-color: #f48225;
    color: #232629;
  }
  @media (max-width: 640px) {
    display: ${props => props.display || 'block'};
  }
`;
const HamburgerIconImg = styled.img`
  display: none;
  @media (max-width: 640px) {
    display: block;
    cursor: pointer;
    width: 25px;
    height: 25px;
    margin-left: 15px;
    margin-right: 5px;
  }
`;
const HamburgerBtn = styled.button`
  display: none;
  @media (max-width: 640px) {
    display: block;
    background: none;
  }
`;
const LogBtn = styled.div`
  padding: 8px 10.4px;
  border: 1px solid black;
  background-color: blue;
  font-size: 14px;
  border-radius: 4px;
  margin-right: 5px;
`;
function Header() {
  const [isLogin, setIsLogIn] = useState(false);
  const [isProductsClick, setIsProductsClick] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleWindowClick = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProductsClick(false);
      }
    };

    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  return (
    <>
      <HeaderLine />
      <StyledHeader>
        <HeaderContainer>
          <HamburgerBtn>
            <HamburgerIconImg src={HamburgerIcon} alt='' />
          </HamburgerBtn>
          <HeaderLogoImgMini src={StackOverflowMini} alt='StackOverflowMini' />
          <HeaderLogoImg src={HeaderLogo} alt='HeaderLogo' />
          {isLogin ? (
            <NavigationBtn
              onClick={() => setIsProductsClick(true)}
              ref={dropdownRef}
            >
              Products
              {isProductsClick ? <ProductsNav /> : null}
            </NavigationBtn>
          ) : (
            <>
              <NavigationBtn display='none'>About</NavigationBtn>
              <NavigationBtn
                onClick={() => setIsProductsClick(true)}
                ref={dropdownRef}
              >
                Products
                {isProductsClick ? <ProductsNav /> : null}
              </NavigationBtn>
              <NavigationBtn display='none'>For Teams</NavigationBtn>
            </>
          )}
          <Search isLogin={isLogin} />
          {isLogin ? (
            <UserNav />
          ) : (
            <LogBtn
              onClick={() => {
                setIsLogIn(true);
              }}
            >
              Log in
            </LogBtn>
          )}
          {isLogin ? <LoginNav /> : <LogBtn>Sign up</LogBtn>}
        </HeaderContainer>
      </StyledHeader>
    </>
  );
}
export default Header;
