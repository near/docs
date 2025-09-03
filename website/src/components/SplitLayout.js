/**
 * SplitLayoutContainer Component
 * 
 * An alternative approach using children instead of props.
 * Use this when you need to include markdown content like code blocks.
 * 
 * Usage:
 * <SplitLayoutContainer>
 *   <SplitLayoutLeft title="Description">
 *     <p>Your description here</p>
 *   </SplitLayoutLeft>
 *   <SplitLayoutRight title="Example">
 *     ```json
 *     { "example": "code" }
 *     ```
 *   </SplitLayoutRight>
 * </SplitLayoutContainer>
 */
export function SplitLayoutContainer({ children, className = "" }) {
  return (
    <div className={`row ${className}`}>
      {children}
    </div>
  );
}

/**
 * SplitLayoutLeft Component
 * 
 * Left column for SplitLayoutContainer
 */
export function SplitLayoutLeft({ children, title = "Description", size = "6" }) {
  return (
    <div className={`col col--${size}`}>
      <h4>{title}</h4>
      {children}
    </div>
  );
}

/**
 * SplitLayoutRight Component
 * 
 * Right column for SplitLayoutContainer
 */
export function SplitLayoutRight({ children, title = "Example", size = "6" }) {
  return (
    <div className={`col col--${size}`}>
      <h4>{title}</h4>
      {children}
    </div>
  );
}