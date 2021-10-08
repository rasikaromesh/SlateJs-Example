import { Editor, EditorState, RichUtils } from 'draft-js';
import { useState } from 'react';

const MyEditor = () => {
  const [editorState, seteditorState] = useState(() =>
    EditorState.createEmpty()
  );
  return <Editor editorState={editorState} onChange={seteditorState} />;
};

export default MyEditor;
