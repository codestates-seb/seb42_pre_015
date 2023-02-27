// import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import './Editor.css';

function Editor({ newAnswer, setNewAnswer }) {
  //   const [text, setText] = useState('');

  const modules = {
    toolbar: [
      //   [{ font: [] }],
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' }
      ],
      //   ['link', 'image'],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ['clean']
    ]
  };

  const formats = [
    //'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'color',
    'background'
  ];

  const handleText = content => {
    // console.log('value:', editor.getText(content));
    // setText(editor.getText(content));
    setNewAnswer(content);
  };

  return (
    <ReactQuill
      modules={modules}
      formats={formats}
      value={newAnswer}
      onChange={handleText}
    />
  );
}

export default Editor;
