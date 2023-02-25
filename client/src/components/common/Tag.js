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
const Tag = ({ tags }) => {
  console.log(tags);
  return (
    <TagContainer id='tags'>
      {tags &&
        tags.map((tag, index) => (
          <li key={index} className='tag'>
            <span className='tag-title'>{tag}</span>
          </li>
        ))}
    </TagContainer>
  );
};

export default Tag;
