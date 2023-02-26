import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../EditorStyles.css';

function Editor({ editorInput, setEditorInput, formValues }) {
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
    <ReactQuill
      modules={modules}
      formats={formats}
      value={editorInput}
      onChange={handleText}
    />
  );
}

export default Editor;
