// * Base
import cn from 'classnames';
import React, { memo } from 'react';

// * Types
import { EButton, EDesign } from '../../types/button.types';

// * Types local
type TProps = {
  text: string;
  disabled?: boolean;
  design: EDesign;
  type: EButton;
  className?: string;
  onClick: () => void;
};

const Button: React.FC<TProps> = memo(
  ({ type, text, design, disabled = false, className, onClick }) => {
    const stylesList = ['button'];

    switch (design) {
      case EDesign.RETRY: {
        stylesList.push('retry');
        break;
      }
    }

    return (
      <button
        type={type}
        onClick={onClick}
        className={cn(stylesList, className)}
        disabled={disabled}
      >
        <span>{text}</span>
      </button>
    );
  }
);

export default Button;
