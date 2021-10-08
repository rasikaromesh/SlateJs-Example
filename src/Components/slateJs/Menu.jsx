/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React from 'react';

const cssMenu = css`
  & > * {
    display: inline-inline-block;
  }

  & > * * * {
    margin-left: 15px;
  }
`;

const Menu = React.forwardRef(({ className, ...props }, ref) => (
  <div {...props} ref={ref} css={[className, cssMenu]} />
));

export default Menu;
