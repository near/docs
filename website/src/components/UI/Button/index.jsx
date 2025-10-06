import styles from './Button.module.scss';

const Button = ({ 
  children,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'ghost', 'danger'
  size = 'medium', // 'small', 'medium', 'large'
  href,
  target,
  onClick,
  disabled = false,
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  className = '',
  type = 'button',
  ...props 
}) => {
  // Determine if button should be a link
  const Component = href && !disabled ? 'a' : 'button';
  
  // Build CSS classes
  const buttonClasses = [
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    fullWidth ? styles['button--fullWidth'] : '',
    loading ? styles['button--loading'] : '',
    disabled ? styles['button--disabled'] : '',
    className
  ].filter(Boolean).join(' ');

  // Button content
  const buttonContent = (
    <>
      {loading && (
        <span className={styles.button__spinner}>
          <svg className={styles.spinner} viewBox="0 0 24 24" fill="none">
            <circle 
              className={styles.spinnerCircle} 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="3"
            />
          </svg>
        </span>
      )}
      
      {!loading && leftIcon && (
        <span className={styles.button__icon}>
          {leftIcon}
        </span>
      )}
      
      <span className={styles.button__text}>
        {children}
      </span>
      
      {!loading && rightIcon && (
        <span className={styles.button__icon}>
          {rightIcon}
        </span>
      )}
    </>
  );

  // Render link
  if (href && !disabled) {
    return (
      <Component
        className={buttonClasses}
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        onClick={onClick}
        aria-disabled={loading}
        {...props}
      >
        {buttonContent}
      </Component>
    );
  }

  // Render button
  return (
    <Component
      className={buttonClasses}
      onClick={!disabled && !loading ? onClick : undefined}
      disabled={disabled || loading}
      type={type}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {buttonContent}
    </Component>
  );
};

export default Button;
