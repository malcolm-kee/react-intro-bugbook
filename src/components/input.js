import React from 'react';

export const Input = React.forwardRef(
  ({ onChangeValue, onChange, ...props }, ref) => {
    return (
      <input
        onChange={ev => {
          if (onChangeValue) {
            onChangeValue(ev.target.value);
          }
          if (onChange) {
            onChange(ev);
          }
        }}
        {...props}
        ref={ref}
      />
    );
  }
);
