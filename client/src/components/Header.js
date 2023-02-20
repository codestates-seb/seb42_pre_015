import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import HeaderLogo from '../assets/Header/HeaderLogo.JPG';
import UserNav from './Header/UserNav';
import ProductsNav from './Header/ProductsNav';
import Search from './Header/Search';
import LoginNav from './Header/LoginNav';

const StyledHeader = styled.div`
  width: 100%;
  height: 50px;
  background-color: #f8f9f9;
  display: fixed;
  z-index: 10;
  margin: 0 auto;
`;

const HeaderLine = styled.div`
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
    background-color: #e3e6e8;
    color: #232629;
  }
`;

function Header() {
  const [isLogin] = useState(true);
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
              <NavigationBtn>About</NavigationBtn>
              <NavigationBtn
                onClick={() => setIsProductsClick(true)}
                ref={dropdownRef}
              >
                Products
                {isProductsClick ? <ProductsNav /> : null}
              </NavigationBtn>
              <NavigationBtn>For Teams</NavigationBtn>
            </>
          )}
          <Search isLogin={isLogin} />
          <UserNav />
          <LoginNav />
        </HeaderContainer>
      </StyledHeader>
    </>
  );
}
export default Header;
