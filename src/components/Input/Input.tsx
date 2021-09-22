import React, { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface IInputProps {
  errorText?: string[];
  value: string;
  inputLabel?: string;
}

export const Input: FC<DefaultInputPropsType & IInputProps> = ({
  errorText,
  value,
  inputLabel,
  ...props
}) => {
  return (
    <label>
      {inputLabel}
      <input
        className={errorText && errorText?.length > 0 ? 'input--error' : ''}
        value={value}
        required
        {...props}
      />
      {errorText &&
        errorText.map((item, index) => (
          <span key={index + item} className={'error-message'}>
            {item}
          </span>
        ))}
    </label>
  );
};
