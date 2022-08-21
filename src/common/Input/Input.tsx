import React from 'react';

interface ButtonInterface {
  input: {
    id: string;
    type: string;
    placeholder: string;
    onBlur: () => void;
    onChange: () => void;
    value: string;
  };
  label: { isVisible: boolean; title: string };
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, ButtonInterface>(
  ({ input, label, className = '' }, ref): JSX.Element => {
    return (
      <div className={`flex flex-col justify-start items-start ${className}`}>
        {label.isVisible && (
          <label
            htmlFor={input.id}
            className={`block mb-2 text-sm dark:text-lightGrey`}
          >
            {label.title}
          </label>
        )}
        <input
          {...input}
          ref={ref}
          className={`w-full p-2 rounded-lg focus:ring-blue focus:border-blue
        dark:bg-darkGrey dark:placeholder-darkModeLightBlack dark:text-darkModeLightBlack`}
        />
      </div>
    );
  }
);

export default Input;
