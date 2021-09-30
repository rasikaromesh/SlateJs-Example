import React from 'react';
import { jsx, css } from '@emotion/react';
import './icon.scss';

const Icon = React.forwardRef(({ className, ...props }, ref) => (
  <span
    {...props}
    ref={ref}
    className={jsx(
      'material-icons',
      className,
      css`
        font-size: 18px;
        vertical-align: text-bottom;
      `
    )}
  />
));
export default Icon;
