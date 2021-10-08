import { useCallback, useMemo, useState } from 'react';
import { Slate, withReact } from 'slate-react';
import { createEditor, Editor, Transforms, Text } from 'slate';
import { withHistory } from 'slate-history';
import isHotkey from 'is-hotkey';
import {
  FormatBold,
  // FormatItalic,
  // FormatUnderlined,
  // Code,
  // LooksOne,
  // LooksTwo,
  // FormatQuote,
  // FormatListNumbered,
  // FormatListBulleted,
  // Transform,
} from '@material-ui/icons';
import { toggleMark } from './util';

import Toolbar from './Toolbar/Toolbar';
import './editorComponent.scss';
import MarkButton from './MarkButton/MarkButton';
import { Editable } from 'slate-react';
import CodeElement from './CodeElement/CodeElement';
import DefaultElement from './DefaultElement/DefaultElement';
import LeafElement from './LeafElement/LeafElement';
import { SvgIcon } from '@material-ui/core';
import ToolButton from './ToolButton/ToolButton';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const localStorage = window.localStorage;

const CustomEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold === true,
      universal: true,
    });
    return !!match;
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === 'code',
    });
    return !!match;
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
};

const print = (value) => {
  console.log(value.children);
};

const onKeyDown = (event, editor) => {
  if (!event.ctrlKey) {
    return;
  }

  switch (event.key) {
    case '`': {
      event.preventDefault();
      CustomEditor.toggleBoldMark(editor);
      break;
    }
    case 'b': {
      event.preventDefault();
      CustomEditor.toggleBoldMark(editor);
      break;
    }
    default:
      break;
  }

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
};

const onChangeSlate = (value, editor, setValue) => {
  setValue(value);
  const isAstChange = editor.operations.some(
    (op) => 'set_selection' !== op.type
  );
  if (isAstChange) {
    // Save the value to Local Storage.
    // const content = JSON.stringify(value);
    localStorage.setItem('content', value);
  }
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

  const renderLeaf = useCallback((props) => {
    return <LeafElement {...props} />;
  }, []);
  return (
    <div>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => {
          onChangeSlate(value, editor, setValue);
        }}
      >
        <div>
          <MarkButton format="bold" icon="format_bold" />

          {/* <MarkButton
            icon={FormatBold}
            onMouseDown={(e) => {
              e.preventDefault();
              CustomEditor.toggleBoldMark(editor);
            }}
          >
            {FormatBold}
          </MarkButton>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              CustomEditor.toggleBoldMark(editor);
            }}
          >
            <SvgIcon component={FormatBold} />
          </button>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              CustomEditor.toggleCodeBlock(editor);
            }}
          >
            Code Block
          </button>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              print(editor);
            }}
          >
            print
          </button> */}
        </div>
        <Editable
          renderElement={renderElement}
          placeholder="Enter some rich text"
          renderLeaf={renderLeaf}
          spellCheck
          autoFocus
          onKeyDown={(event, editor) => {
            onKeyDown(event, editor);
          }}
        />
      </Slate>
    </div>
  );
}
