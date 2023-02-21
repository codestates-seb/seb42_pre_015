import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { GlassesSvg } from '../../../assets/Header/HeaderSVG';

const SearchForm = styled.form`
  width: 100%;
  max-width: ${props => props.width || '776.734px'};
  padding: 0 8px;
  position: relative;
  border: none;
  @media (max-width: 640px) {
    display: flex;
    justify-content: right;
    align-items: center;
  }
`;
const SearchIcon = styled.div`
  cursor: pointer;
  position: absolute;
  top: 6px;
  left: 15px;
  opacity: 0.5;
  @media (max-width: 640px) {
    position: static;
  }
`;
const SearchInput = styled.input`
  width: 100%;
  padding: 7.8px 9.1px 7.8px 32px;
  background-color: rgb(255, 255, 255);
  border: 1px solid hsl(210, 8%, 75%);
  &:focus {
    outline: none;
    -webkit-box-shadow: 0px 0px 8px 1px hsl(206, 90%, 69.5%);
    box-shadow: 0px 0px 8px 1px hsl(206, 90%, 69.5%);
  }
  @media (max-width: 640px) {
    display: none;
  }
`;
const SearchInputNavigation = styled.div`
  background-color: white;
  position: absolute;
  top: 43px;
  left: 8px;
  width: 100%;
  max-width: 760px;
  min-width: 420px;
  z-index: 2000;
  border: 1px solid hsl(210, 8%, 85%);
  border-radius: 5px;
  box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.06), 0 2px 6px hsla(0, 0%, 0%, 0.06),
    0 3px 8px hsla(0, 0%, 0%, 0.09);
  ol {
    display: block;
  }
  @media (max-width: 640px) {
    left: -150px;
    max-width: 670px;
    min-width: 470px;
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
      width: 100%;
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
  max-width: 100%;
  white-space: normal;
`;
export default function Search({ isLogin }) {
  const searchRef = useRef(null);
  const searchIconRef = useRef(null);
  const searchNavRef = useRef(null);
  const [isSearchClick, setIsSearchClick] = useState(false);

  useEffect(() => {
    const handleSearchClick = e => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target) &&
        searchNavRef.current &&
        !searchNavRef.current.contains(e.target) &&
        searchIconRef.current &&
        !searchIconRef.current.contains(e.target)
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
      <SearchIcon
        ref={searchIconRef}
        onClick={() => {
          setIsSearchClick(pre => !pre);
        }}
      >
        <GlassesSvg />
      </SearchIcon>
      {isLogin ? (
        <SearchInput
          width='776.734px'
          placeholder='Search...'
          onFocus={() => {
            setIsSearchClick(true);
          }}
          ref={searchRef}
        />
      ) : (
        <SearchInput
          width='776.734px'
          placeholder='Search...'
          onFocus={() => {
            setIsSearchClick(true);
          }}
          ref={searchRef}
        />
      )}

      {isSearchClick ? (
        <SearchInputNavigation ref={searchNavRef}>
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
                <SearchNavFont>&quot;words here&quot;</SearchNavFont>
                <SearchNavFont2>&nbsp;exact phrase</SearchNavFont2>
              </div>
              <div>
                <SearchNavFont>collective:&quot;Name&quot;</SearchNavFont>
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
    </SearchForm>
  );
}
