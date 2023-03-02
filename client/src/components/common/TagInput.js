// import { useState } from 'react';
import styled from 'styled-components';

export const InputContainer = styled.div`
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
    /* box-shadow: 0 0 0 4px #d9e9f6;
    border: 1px solid #409ad6; */
    border: 1px solid ${props => (props.border ? '#DE4F54' : '#409ad6')};
    box-shadow: ${props =>
      props.border ? '0 0 0 4px #F6E0E0' : '0 0 0 4px #d9e9f6'};
  }
`;

const TagInput = ({
  tags,
  formValues,
  setFormValues,
  handleValidation,
  tagErrorMsg,
  handleKeyDown
}) => {
  const addTags = event => {
    if (event.key === 'Enter') {
      if (event.target.value === '') {
        //do nothing
      } else if (tags.includes(event.target.value) || tags.length > 4) {
        event.target.value = '';
      } else {
        setFormValues({ ...formValues, tags: [...tags, event.target.value] });
        event.target.value = '';
      }
    }
  };

  const removeTags = (indexToRemove, id) => {
    setFormValues({
      ...formValues,
      tags: tags.filter(tag => tag !== tags[indexToRemove])
    });
  };

  return (
    <>
      <InputContainer border={tagErrorMsg}>
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
          name='tags'
          type='text'
          onKeyUp={event => (event.key === 'Enter' ? addTags(event) : null)}
          onKeyDown={handleKeyDown}
          onBlur={handleValidation}
        />
      </InputContainer>
    </>
  );
};

export default TagInput;
