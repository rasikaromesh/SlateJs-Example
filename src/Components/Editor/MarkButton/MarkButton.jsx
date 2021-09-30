import { useSlate } from 'slate-react';

import { toggleMark, isMarkActive } from '../util';

import Button from './Button/Button';
import Icon from './Icon/Icon';
import './markButton.scss';

export default function MarkButton({ format, icon }) {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(e) => {
        e.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon> {icon}</Icon>
    </Button>
  );
}
