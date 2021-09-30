import { useCallback, useMemo, useState } from 'react';
import { Slate, withReact } from 'slate-react';
import { createEditor, Editor, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import isHotkey from 'is-hotkey';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Code,
  LooksOne,
  LooksTwo,
  FormatQuote,
  FormatListNumbered,
  FormatListBulleted,
  Transform,
} from '@material-ui/icons';
import { toggleMark } from './util';

import Toolbar from './Toolbar/Toolbar';
import './editorComponent.scss';
import MarkButton from './MarkButton/MarkButton';
import { Editable } from 'slate-react';
import CodeElement from './CodeElement/CodeElement';
import DefaultElement from './DefaultElement/DefaultElement';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

export default function EditorComponent() {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);
  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);
  return (
    <div>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <Editable
          renderElement={renderElement}
          placeholder="Enter some rich text"
          spellCheck
          autoFocus
          onKeyDown={(event) => {
            if (event.key === '`' && event.ctrlKey) {
              event.preventDefault();
              const [match] = Editor.nodes(editor, {
                match: (n) => n.type === 'code',
              });
              Transforms.setNodes(
                editor,
                { type: match ? 'paragraph' : 'code' },
                { match: (n) => Editor.isBlock(editor, n) }
              );
            }
          }}
        />
      </Slate>
    </div>
  );
}
