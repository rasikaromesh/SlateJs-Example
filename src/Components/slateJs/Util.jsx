const { Editor } = require('slate');

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const toggleMark = (editor, format) => {
  console.log(format);
  console.log('toggoleMark');
  if (format === 'code') {
    Editor.addMark(editor, format, true);
    console.log(editor);
    console.log(Editor.marks(editor));
  }
  if (format !== 'code') {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  }
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

module.exports = { HOTKEYS, toggleMark, isMarkActive };
