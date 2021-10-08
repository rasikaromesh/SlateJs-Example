import React from 'react';
import { useSlate, useSelected } from 'slate-react';
import Button from './Button';
import Icon from './Icon';
import { isMarkActive, toggleMark } from './Util';

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  const selected = useSelected();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(e) => {
        e.preventDefault();
        console.log('selected - ', selected);
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

export default MarkButton;
