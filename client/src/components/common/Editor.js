import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../EditorStyles.css';
import styled from 'styled-components';

const StyledEditor = styled.div`
  border-radius: 3px;
  &:focus-within {
    border: 1px solid ${props => (props.border ? '#DE4F54' : '#409ad6')};
    box-shadow: ${props =>
      props.border ? '0 0 0 4px #F6E0E0' : '0 0 0 4px #d9e9f6'};
  }
`;

function Editor({
  editorInput,
  setEditorInput,
  formValues,
  handleValidation,
  contentErrorMsg
}) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' }
      ],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ['clean']
    ]
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'align',
    'color',
    'background'
  ];

  const handleText = content => {
    setEditorInput({ ...formValues, content: content });
  };

  return (
    <StyledEditor
      name='content'
      onBlur={handleValidation}
      border={contentErrorMsg}
    >
      <ReactQuill
        modules={modules}
        formats={formats}
        value={editorInput}
        onChange={handleText}
      />
    </StyledEditor>
  );
}

export default Editor;
