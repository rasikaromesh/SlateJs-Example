/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React from 'react';

const cssIcon = css`
  font-size: 18px;
  vertical-align: text-bottom;
`;

const Icon = React.forwardRef(({ className, ...props }, ref) => (
  <span {...props} ref={ref} css={[className, cssIcon, 'material-icons']} />
));

export default Icon;
