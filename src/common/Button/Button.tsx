import React from 'react';

interface ButtonInterface {
  children?: React.ReactNode;
  className?: string;
  type: 'button' | 'submit' | 'reset';
  onClick: () => void;
}

export default function Button({
  children,
  className = '',
  type = 'button',
  onClick,
}: ButtonInterface): JSX.Element {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-full ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
