import React from 'react';
import { SvgIcon } from '@material-ui/core';
import './toolButton.scss';
import { useSlate } from 'slate-react';

// function ToolButton(icon, onMouseDown) {
//   console.log(icon);
//   return (
//     <div className="tool-button">
//       <SvgIcon component={icon} onMouseDown={() => console.log('test')} />
//     </div>
//   );
// }

const ToolButton = React.forwardRef(({ format, icon }, ref) => {
  const editor = useSlate();
  console.log(ref);
  return <SvgIcon component={icon} onMouseDown={() => console.log('test')} />;
});

export default ToolButton;
