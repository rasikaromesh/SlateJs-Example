import { SvgIcon } from '@material-ui/core';
import React from 'react';
import './icon.scss';

const Icon = () =>
  React.forwardRef(({ className, ...props }, ref) => {
    <SvgIcon {...props} ref={ref} className={className} />;
  });

export default Icon;
