import { useCallback, useState, useMemo } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';
import isHotkey from 'is-hotkey';

import Element from './Element';
import InitialValue from './initialValue';
import Leaf from './Leaf';
import { HOTKEYS, toggleMark } from './Util';
import Toolbar from './Toolbar';
import MarkButton from './MarkButton';
import BlockButton from './BlockButton';

function RichTextEditor() {
  const [value, setValue] = useState(InitialValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Toolbar>
        <MarkButton format="bold" icon="Bold" />
        <MarkButton format="italic" icon="Italic" />
        <MarkButton format="underline" icon="Underline" />
        <MarkButton format="code" icon="Code" />
        <BlockButton format="heading-one" icon="H1" />
        <BlockButton format="heading-two" icon="H2" />
        <BlockButton format="block-quote" icon="Quote" />
        <BlockButton format="numbered-list" icon="Numbered List" />
        <BlockButton format="bulleted-list" icon="Bulleted List" />
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter Some Rich Text"
        spellCheck
        autoFocus
        onKeyDown={(e) => {
          for (const hotKey in HOTKEYS) {
            if (isHotkey(hotKey, e)) {
              e.preventDefault();
              const mark = HOTKEYS[hotKey];
              toggleMark(editor, mark);
            }
          }
        }}
      />
    </Slate>
  );
}

export default RichTextEditor;
