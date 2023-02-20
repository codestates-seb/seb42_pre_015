import styled from 'styled-components';
import { ReactComponent as GlassesIcon } from '../../assets/Header/GlassesIcon.svg';
import { useEffect, useRef, useState } from 'react';

const SearchForm = styled.form`
  padding: 0 8px;
  position: relative;
  border: none;
`;
const SearchIcon = styled.div`
  position: absolute;
  top: 6px;
  left: 15px;
  opacity: 0.5;
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
  ol {
    display: block;
  }
`;
const SearchDiv = styled.div`
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    width: 50%;
    div {
      display: flex;
      justify-content: left;
      align-items: center;
      margin-bottom: 12px;
    }
  }
`;
const SearchNavFont = styled.span`
  font-size: 13px;
  color: black;
`;
const SearchNavFont2 = styled.span`
  font-size: 13px;
  color: rgb(106, 115, 124);
`;
export default function Search({ isLogin }) {
  const searchRef = useRef(null);
  const searchNavRef = useRef(null);
  const [isSearchClick, setIsSearchClick] = useState(false);

  useEffect(() => {
    const handleSearchClick = e => {
      console.log(!searchNavRef.current.contains(e.target));
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target) &&
        !searchNavRef.current.contains(e.target)
      ) {
        setIsSearchClick(false);
      }
    };
    window.addEventListener('click', handleSearchClick);

    return () => {
      window.removeEventListener('click', handleSearchClick);
    };
  }, []);

  return (
    <SearchForm>
      <SearchIcon>
        <GlassesIcon />
      </SearchIcon>
      {isLogin ? (
        <>
          <SearchInput
            width='776.734px'
            placeholder='Search...'
            onFocus={() => {
              setIsSearchClick(true);
            }}
            ref={searchRef}
          />
          {isSearchClick ? (
            <SearchInputNavigation width='776.734px' ref={searchNavRef}>
              <SearchDiv>
                <div>
                  <div>
                    <SearchNavFont>[tag]</SearchNavFont>
                    <SearchNavFont2>&nbsp;serch within a tag</SearchNavFont2>
                  </div>
                  <div>
                    <SearchNavFont>user:1234</SearchNavFont>
                    <SearchNavFont2>&nbsp;serch by author</SearchNavFont2>
                  </div>
                  <div>
                    <SearchNavFont>"words here"</SearchNavFont>
                    <SearchNavFont2>&nbsp;exact phrase</SearchNavFont2>
                  </div>
                  <div>
                    <SearchNavFont>collective:"Name"</SearchNavFont>
                    <SearchNavFont2>&nbsp;collective content</SearchNavFont2>
                  </div>
                </div>
                <div>
                  <div>
                    <SearchNavFont>answers:0</SearchNavFont>
                    <SearchNavFont2>&nbsp;unanswered questions</SearchNavFont2>
                  </div>
                  <div>
                    <SearchNavFont>score:3</SearchNavFont>
                    <SearchNavFont2>&nbsp;post with a 3+ score</SearchNavFont2>
                  </div>
                  <div>
                    <SearchNavFont>is:question</SearchNavFont>
                    <SearchNavFont2>&nbsp;type of post</SearchNavFont2>
                  </div>
                  <div>
                    <SearchNavFont>isaccepted:yes</SearchNavFont>
                    <SearchNavFont2>&nbsp;search within status</SearchNavFont2>
                  </div>
                </div>
              </SearchDiv>
            </SearchInputNavigation>
          ) : null}
        </>
      ) : (
        <>
          <SearchInput
            width='717.828px'
            placeholder='Search...'
            onFocus={() => {
              setIsSearchClick();
            }}
          />
          {isSearchClick ? (
            <SearchInputNavigation width='717.828px'></SearchInputNavigation>
          ) : null}
        </>
      )}
    </SearchForm>
  );
}
