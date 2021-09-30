import React from 'react';
import { jsx, css } from '@emotion/react';
import Menu from './Menu/Menu';
import './toolbar.scss';

const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
  <Menu
    {...props}
    ref={ref}
    className={jsx(
      className,
      css`
        position: relative;
        padding: 1px, 18px, 17px;
        margin: 0 -20px;
        border-bottom: 2px solid #eee;
        margin-bottom: 20px;
      `
    )}
  />
));

export default Toolbar;
