/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React from 'react';

const Button = React.forwardRef(
  ({ className, active, reversed, ...props }, ref) => {
    const cssButton = css`
      cursor: pointer;
      color: ${reversed
        ? active
          ? 'white'
          : '#aaa'
        : active
        ? 'black'
        : '#ccc'};
    `;
    return <span {...props} ref={ref} css={[className, cssButton]} />;
  }
);

export default Button;
