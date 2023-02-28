import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { GlassesSvg } from '../../../assets/Header/HeaderSVG';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    position: static;
    left: -150px;
    top: 90px;
    max-width: 670px;
    min-width: 430px;
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
const MobilInput = styled.input`
  display: none;
  @media (max-width: 640px) {
    display: block;
    margin-bottom: 5px;
    width: 100%;
    padding: 7.8px 9.1px 7.8px 32px;
    background-color: rgb(255, 255, 255);
    border: 1px solid hsl(210, 8%, 75%);
    &:focus {
      outline: none;
      -webkit-box-shadow: 0px 0px 8px 1px hsl(206, 90%, 69.5%);
      box-shadow: 0px 0px 8px 1px hsl(206, 90%, 69.5%);
    }
  }
`;
const MobilNav = styled.div`
  @media (max-width: 640px) {
    position: absolute;
    padding: 5px;
    width: 95vw;
    top: 40px;
    left: -150px;
    z-index: 100;
  }
`;
const MobilIcon = styled.div`
  display: none;
  @media (max-width: 640px) {
    display: block;
    position: absolute;
    top: 10px;
    left: 14px;
    opacity: 0.5;
  }
`;
export default function Search({ SearchDataHandler }) {
  const searchRef = useRef(null);
  const searchIconRef = useRef(null);
  const searchNavRef = useRef(null);
  const [isSearchClick, setIsSearchClick] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

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

  function extractTargets(input) {
    // 이름 추출
    const nameRegex = /name:(\S+)/;
    const nameMatch = input.match(nameRegex);
    const name = nameMatch ? nameMatch[1] : null;

    // 태그 추출
    const tagRegex = /\[(\S+?)\]/g;
    const tagMatches = [];
    let tagMatch;
    while ((tagMatch = tagRegex.exec(input))) {
      tagMatches.push(tagMatch[1]);
    }

    // 답변 수 추출
    const answersRegex = /answers:(\d+)/;
    const answersMatch = input.match(answersRegex);
    const answers = answersMatch ? answersMatch[1] : null;

    // 나머지 추출
    const restRegex = /name:\S+|\[(\S+?)\]|answers:\d+\s+/g;
    const rest = input.replace(restRegex, '').trim();

    // 로그 출력
    const params = { page: 1, size: 20, sort: 'questionId,asc' };
    if (name !== null) params.name = name;
    if (answers !== null) params.answerCount = Number(answers);
    if (tagMatches.length !== 0) params.tags = tagMatches;
    if (rest !== '') params.title = rest;

    return params;
  }

  const SumbitHandler = e => {
    if (e.key === 'Enter') {
      const params = extractTargets(searchText);
      console.log(params);
      axios
        .get('/question/search', { params })
        .then(response => {
          console.log(response.data);
          SearchDataHandler(response.data);
          setIsSearchClick(false);
          navigate('/');
        })
        .catch(error => {
          console.error(error);
        });
      setSearchText('');
    }
  };

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
      <SearchInput
        width='776.734px'
        placeholder='Search...'
        onFocus={() => {
          setIsSearchClick(true);
        }}
        ref={searchRef}
        onChange={e => {
          setSearchText(e.target.value);
        }}
        value={searchText}
        onKeyDown={e => {
          SumbitHandler(e);
        }}
      />
      {isSearchClick ? (
        <MobilNav ref={searchNavRef}>
          <MobilInput></MobilInput>
          <MobilIcon>
            <GlassesSvg />
          </MobilIcon>
          <SearchInputNavigation>
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
        </MobilNav>
      ) : null}
    </SearchForm>
  );
}
