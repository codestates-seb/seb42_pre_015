import { useState } from 'react';
import styled from 'styled-components';

export const TagInput = styled.div`
  display: flex;
  align-items: center;
  height: 37px;
  width: 100%;
  padding-left: 4px;
  border: 1px solid #ced2d5;
  border-radius: 3px;

  > ul {
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
      > .tag-title {
        color: #276891;
        font-size: 12px;
      }
      > .tag-close-icon {
        width: 17px;
        height: 17px;
        line-height: 14px;
        font-size: 16px;
        font-weight: 600;
        margin-left: 4px;
        color: #276891;
        background: #dce9f2;
        border-radius: 3px;
        &:hover {
          background: #276891;
          color: #fff;
        }
      }
    }
  }
  > input {
    flex: 1;
    border: none;
    height: 90%;
    font-size: 14px;
    padding: 4px 0 0 0;
    :focus {
      outline: transparent;
    }
  }
  &:focus-within {
    border: 1.5px solid pink;
    box-shadow: 0 0 0 4px #d9e9f6;
    border: 1px solid #409ad6;
  }
`;

const TagsInput = () => {
  const initialTags = ['java', 'javascript'];

  const [tags, setTags] = useState(initialTags);

  const removeTags = indexToRemove => {
    setTags(tags.filter(tag => tag !== tags[indexToRemove]));
  };

  const addTags = event => {
    if (event.key === 'Enter') {
      if (event.target.value === '') {
        //do nothing
      } else if (tags.includes(event.target.value)) {
        event.target.value = '';
      } else {
        setTags([...tags, event.target.value]);
        event.target.value = '';
      }
    }
  };

  return (
    <>
      <TagInput>
        <ul id='tags'>
          {tags.map((tag, index) => (
            <li key={index} className='tag'>
              <span className='tag-title'>{tag}</span>
              <button
                className='tag-close-icon'
                onClick={() => removeTags(index)}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
        <input
          className='tag-input'
          type='text'
          onKeyUp={event => (event.key === 'Enter' ? addTags(event) : null)}
        />
      </TagInput>
    </>
  );
};

export default TagsInput;
