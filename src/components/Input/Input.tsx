import React, { ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes, memo, useMemo } from 'react';

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface IInputProps extends Omit<DefaultInputPropsType, 'onChange'> {
  errorText?: string[];
  value: string;
  inputLabel?: string;
  onChange?: (value: string, e: ChangeEvent<HTMLInputElement>) => void;
}

const ID = (() => {
  let id = 0;
  return () => ++id;
})();

export const Input: FC<IInputProps> = memo(({
  errorText,
  value,
  inputLabel,
  onChange,
  ...props
}) => {
  const id = useMemo(ID, []);
  console.log(`Input #${id} rerendered`);
  return (
    <label>
      {inputLabel}
      <input
        className={errorText && errorText?.length > 0 ? 'input--error' : ''}
        value={value}
        required
        onChange={(e) => onChange?.(e.target.value, e)}
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
});
