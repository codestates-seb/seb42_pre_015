import styled from 'styled-components';

const TagContainer = styled.ul`
  display: flex;
  height: 23px;
  > .tag {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 6px;
    margin-right: 4px;
    border-radius: 3px;
    background: #dce9f2;
    &:hover {
      background: #c8dfee;
    }
    > .tag-title {
      color: #276891;
      font-size: 12px;
      &:hover {
        color: #1f4e6a;
      }
    }
  }
`;
const Tag = () => {
  return (
    <TagContainer id='tags'>
      <li className='tag'>
        <span className='tag-title'>JavaScript</span>
      </li>
    </TagContainer>
  );
};

export default Tag;
