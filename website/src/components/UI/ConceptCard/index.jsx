import * as Icons from "lucide-react"
import styles from "./styles.module.css"

export default function ConceptCard({ title, description, image, index }) {
  const isEven = index % 2 === 0

  // import the icon component dynamically based on the icon prop

  // Precompose columns for clarity, then render in desired order
  const IconColumn = (
    <div className={`col col--5 ${isEven ? styles.colPadRight : styles.colPadLeft}`}>
      <div className={styles.imageWrap} style={{backgroundImage: `url(${image})`}}>
      </div>
    </div>
  )

  const ContentColumn = (
    <div className={`col col--7 ${styles.contentCol}`} style={{ padding: 0 }}>
      <h2>{title}</h2>
      <p className={styles.description}>{description}</p>
      <button className={`button button--link ${styles.cta}`} type="button">
        Learn More
        <Icons.ArrowRight className={styles.ctaIcon} aria-hidden="true" />
      </button>
    </div>
  )

  return (
    <div className={`row ${styles.conceptCard}`}>
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
  )
}
