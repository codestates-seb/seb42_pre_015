import { useState } from 'react';
import styled from 'styled-components';
import HeaderLogo from '../assets/HeaderLogo.JPG';
import { ReactComponent as MessagesIcon } from '../assets/MessagesIcon.svg';

const StyledHeader = styled.div`
  width: 100%;
  height: 50px;
  background-color: #f8f9f9;
  display: fixed;
  z-index: 10;
`;

const HeaderLine = styled.div`
  width: 100%;
  height: 3px;
  background-color: #f48225;
`;

const HeaderContainer = styled.div`
  width: 97.2307692rem;
  max-width: 100%;
  height: 100%;
  display: flex;
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
`;
const SearchForm = styled.form`
  padding: 0 8px;
  position: relative;
  border: none;
`;

const SearchInput = styled.input`
  width: ${props => props.width || '717.828px'};
  padding: 7.8px 9.1px 7.8px 32px;
  background-color: rgb(255, 255, 255);
  border: 1px solid hsl(210, 8%, 75%);
  &:focus {
    outline: none;
    -webkit-box-shadow: 0px 0px 8px 1px hsl(206, 90%, 69.5%);
    box-shadow: 0px 0px 8px 1px hsl(206, 90%, 69.5%);
  }
`;

const ProductsNavigation = styled.div`
  background-color: white;
  position: absolute;
  top: 150%;
  left: -80%;
  width: 210.656px;
  z-index: 2001;
  border: 1px solid hsl(210, 8%, 85%);
  border-radius: 5px;
  box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.06), 0 2px 6px hsla(0, 0%, 0%, 0.06),
    0 3px 8px hsla(0, 0%, 0%, 0.09);
  ol {
    display: block;
  }
`;
const ProductsLi = styled.li`
  margin: 6px;
  padding: 6px;
  text-align: left;
  border-radius: 3px;
  display: block;
`;
const ProductsDes = styled.span`
  max-width: 100%;
  display: inline-block;
  font-size: 12px;
  color: rgb(106, 115, 124);
  white-space: normal;
`;

const ProductsTitle = styled.span`
  max-width: 100%;
  display: block;
  font-size: 13px;
  color: black;
`;

const SearchInputNavigation = styled.div`
  background-color: white;
  position: absolute;
  top: 43px;
  left: 8px;
  width: ${props => props.width || '717.828px'};
  z-index: 2000;
  border: 1px solid hsl(210, 8%, 85%);
  border-radius: 5px;
  box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.06), 0 2px 6px hsla(0, 0%, 0%, 0.06),
    0 3px 8px hsla(0, 0%, 0%, 0.09);
  height: 300px;
  ol {
    display: block;
  }
`;
const UserNav = styled.nav`
  padding-right: 12px;
  height: 100%;
  /* overflow-x: auto; */
  display: block;
  ol {
    display: flex;
    height: 100%;
    list-style: none;
    li {
      display: inline-flex;
      padding: 0 12px;
      cursor: pointer;
      span {
        display: inline-flex;
        align-items: center;
        font-weight: 700;
        font-size: 12px;
      }
      a {
        display: inline-flex;
        align-items: center;
        margin-right: 5px;
        position: relative;
        text-align: left;
        color: rgb(82, 89, 96);
        img {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
`;
function Header() {
  const [isLogin] = useState(true);
  const [isProductsClick, setIsProductsClick] = useState(false);
  const [isSearchClick, setIsSearchClick] = useState(false);
  return (
    <div>
      <HeaderLine />
      <StyledHeader>
        <HeaderContainer>
          <HeaderLogoImg src={HeaderLogo} alt='HeaderLogo' />
          {isLogin ? (
            <NavigationBtn onClick={() => setIsProductsClick(pre => !pre)}>
              Products
              {isProductsClick ? (
                <ProductsNavigation>
                  <ol>
                    <ProductsLi>
                      <ProductsTitle>Stack Overflow</ProductsTitle>
                      <ProductsDes>Public questions & answers</ProductsDes>
                    </ProductsLi>
                    <ProductsLi>
                      <ProductsTitle>Stack Overflow for Teams</ProductsTitle>
                      <ProductsDes>
                        where developers & technologists share private Knowledge
                        with coworkers
                      </ProductsDes>
                    </ProductsLi>
                    <ProductsLi>
                      <ProductsTitle>Talent</ProductsTitle>
                      <ProductsDes>Build your employer brand</ProductsDes>
                    </ProductsLi>
                    <ProductsLi>
                      <ProductsTitle>Advertising</ProductsTitle>
                      <ProductsDes>
                        Reach developers & technologists worldwide
                      </ProductsDes>
                    </ProductsLi>
                  </ol>
                </ProductsNavigation>
              ) : null}
            </NavigationBtn>
          ) : (
            <>
              <NavigationBtn>About</NavigationBtn>
              <NavigationBtn onClick={() => setIsProductsClick(pre => !pre)}>
                Products
                {isProductsClick ? <ProductsNavigation /> : null}
              </NavigationBtn>
              <NavigationBtn>For Teams</NavigationBtn>
            </>
          )}

          <SearchForm>
            {isLogin ? (
              <>
                <SearchInput
                  width='776.734px'
                  placeholder='Search...'
                  onFocus={() => {
                    setIsSearchClick(true);
                  }}
                />
                {isSearchClick ? (
                  <SearchInputNavigation width='776.734px'></SearchInputNavigation>
                ) : null}
              </>
            ) : (
              <>
                <SearchInput
                  width='717.828px'
                  placeholder='Search...'
                  onFocus={() => {
                    setIsSearchClick(true);
                  }}
                />
                {isSearchClick ? (
                  <SearchInputNavigation width='717.828px'></SearchInputNavigation>
                ) : null}
              </>
            )}
          </SearchForm>
          <UserNav>
            <ol>
              <li>
                <a href='https://stackoverflow.com/users/21217110/%ed%95%9c%ec%8a%b9%ec%99%84'>
                  <img
                    src='https://lh3.googleusercontent.com/a/AEdFTp6G9ZfXKo7FPo_1fE9FtMz6i7hPnBBBdbF-WjOv=k-s48'
                    alt='user'
                  ></img>
                </a>
                <span>1</span>
              </li>
              <li>
                <a href='https://stackoverflow.com/users/21217110/%ed%95%9c%ec%8a%b9%ec%99%84'>
                  <MessagesIcon></MessagesIcon>
                </a>
              </li>
              <li>
                <a href='https://stackoverflow.com/users/21217110/%ed%95%9c%ec%8a%b9%ec%99%84'>
                  <MessagesIcon></MessagesIcon>
                </a>
              </li>
            </ol>
          </UserNav>
        </HeaderContainer>
      </StyledHeader>
    </div>
  );
}
export default Header;
