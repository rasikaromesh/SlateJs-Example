import React from 'react';
import { useSlate } from 'slate-react';

import { isMarkActive, toggleMark } from '../util';

import Button from '../../Common/Button/Button';
import Icon from '../../Common/Icon/Icon';

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

export default MarkButton;
