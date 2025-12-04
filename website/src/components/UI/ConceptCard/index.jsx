import styles from "./styles.module.css"
import Card from '../Card';

export default function ConceptCard({ title, description, image, href, index, children }) {
  const isEven = index % 2 === 0

  // Precompose columns for clarity, then render in desired order
  const IconColumn = (
    <div className={`col col--5 ${isEven ? styles.colPadRight : styles.colPadLeft}`}>
      <div className={styles.imageWrap} style={{backgroundImage: `url(${image})`}}>
      </div>
    </div>
  )

  const ContentColumn = (
    <div className={`col col--7 ${styles.contentCol}`} style={{ padding: 0 }}>
      {children}
    </div>
  )

  return (
    <div className={styles.conceptCardWrapper}>
      {/* Mobile view - show card */}
      <div className={styles.mobileView} style={{marginBottom: "2rem"}}>
        <Card href={href} title={title} description={description} image={image} variant="image">
          {children}
        </Card>
      </div>

      {/* Desktop view - show two-column layout */}
      <div className={`row ${styles.conceptCard} ${styles.desktopView}`}>
        {isEven ? (
          <>
            {IconColumn}
            {ContentColumn}
          </>
        ) : (
          <>
            {ContentColumn}
            {IconColumn}
          </>
        )}
      </div>
    </div>
  )
}
