import styles from './Card.module.scss';

const Card = ({ 
  children,
  title,
  description,
  image,
  icon,
  href,
  target,
  onClick,
  variant = 'default', // 'default', 'icon', 'image'
  color = 'default', // 'default', 'mint', 'purple', 'orange'
  className = '',
  links,
  ...props 
}) => {
  // Determine if card should be clickable
  const isClickable = href || onClick;
  
  // Build CSS classes
  const cardClasses = [
    styles.card,
    variant === 'icon' ? styles['card--icon'] : '',
    variant === 'image' ? styles['card--image'] : '',
    color === 'mint' ? styles['card--mint'] : '',
    color === 'purple' ? styles['card--purple'] : '',
    color === 'orange' ? styles['card--orange'] : '',
    color === 'blue' ? styles['card--blue'] : '',
    isClickable ? styles['card--clickable'] : '',
    className
  ].filter(Boolean).join(' ');

  // Card content
  const cardContent = (
    <>
      {/* Icon for icon variant */}
      {variant === 'icon' && icon && (
        <div className={styles.card__icon}>
          <div className={styles.card__iconSvg}>
            {icon}
          </div>
        </div>
      )}

      {/* Image for image variant */}
      {variant === 'image' && image && (
        <div className={styles.card__image}>
          {typeof image === 'string' ? (
            <img src={image} alt={title || 'Card image'} />
          ) : (
            image
          )}
        </div>
      )}

      {/* Card body */}
      <div className={styles.card__body}>
        {title && (
          <h3 className={styles.card__title}>{title}</h3>
        )}
        
        {description && (
          <p className={styles.card__description}>{description}</p>
        )}
        
        {children && (
          <div className={styles.card__content}>
            {children}
          </div>
        )}
      </div>
    </>
  );

  // Render appropriate component
  if (href) {
    return (
      <a
        className={cardClasses}
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        onClick={onClick}
        {...props}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <div
      className={cardClasses}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick && onClick(e);
        }
      } : undefined}
      {...props}
    >
      {cardContent}
    </div>
  );
};

export default Card;
