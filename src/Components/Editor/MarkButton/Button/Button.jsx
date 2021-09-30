import React from 'react';
import { jsx, css } from '@emotion/react';

export default function Button({ className, active, reversed, ...props }) {
  console.log(className);
  console.log(active);
  console.log(reversed);
  console.log(props.children);
  return (
    <span
      {...props}
      className={jsx(
        className,
        css`
          cursor: pointer;
          color: ${reversed
            ? active
              ? 'white'
              : '#aaa'
            : active
            ? 'black'
            : '#ccc'};
        `
      )}
    >
      {props.children}
    </span>
  );
}
