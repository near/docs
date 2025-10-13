import { forwardRef } from 'react';
import styles from './Input.module.scss';

const Input = forwardRef(({ 
  id,
  name,
  type = 'text',
  value,
  defaultValue,
  placeholder,
  label,
  helperText,
  error,
  success,
  required = false,
  disabled = false,
  readOnly = false,
  size = 'medium', // 'small', 'medium', 'large'
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  labelClassName = '',
  onChange,
  onBlur,
  onFocus,
  ...props 
}, ref) => {
  // Build CSS classes
  const wrapperClasses = [
    styles.inputWrapper,
    fullWidth ? styles['inputWrapper--fullWidth'] : '',
  ].filter(Boolean).join(' ');

  const inputClasses = [
    styles.input,
    styles[`input--${size}`],
    error ? styles['input--error'] : '',
    success ? styles['input--success'] : '',
    disabled ? styles['input--disabled'] : '',
    leftIcon ? styles['input--withLeftIcon'] : '',
    rightIcon ? styles['input--withRightIcon'] : '',
    className
  ].filter(Boolean).join(' ');

  const labelClasses = [
    styles.label,
    labelClassName
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      {label && (
        <label htmlFor={id} className={labelClasses}>
          <span className={styles.label__text}>{label}</span>
          {required && <span className={styles.label__required}>*</span>}
        </label>
      )}
      
      <div className={styles.inputContainer}>
        {leftIcon && (
          <span className={styles.input__icon}>
            {leftIcon}
          </span>
        )}
        
        <input
          ref={ref}
          id={id}
          name={name}
          type={type}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          className={inputClasses}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${id}-error` : helperText ? `${id}-helper` : undefined
          }
          {...props}
        />
        
        {rightIcon && (
          <span className={styles.input__icon}>
            {rightIcon}
          </span>
        )}
      </div>
      
      {error && (
        <div id={`${id}-error`} className={styles.message}>
          <span className={styles['message--error']}>{error}</span>
        </div>
      )}
      
      {!error && success && (
        <div className={styles.message}>
          <span className={styles['message--success']}>{success}</span>
        </div>
      )}
      
      {!error && !success && helperText && (
        <div id={`${id}-helper`} className={styles.message}>
          <span className={styles['message--helper']}>{helperText}</span>
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
