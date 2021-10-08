import React from 'react';
import './button.scss';

const Button = () =>
  React.forwardRef(({ className, active, reversed, ...props }, ref) => (
    <span {...props} ref={ref} className={className} />
  ));

export default Button;
