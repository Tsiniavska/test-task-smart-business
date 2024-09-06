// * Base
import React, { memo } from 'react';

type TProps = {
  type: string;
  className: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<TProps> = memo(
  ({ type, className, placeholder, value, onChange }) => {
    return (
      <input
        type={type}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    );
  }
);

export default Input;
