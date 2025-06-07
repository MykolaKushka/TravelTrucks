import styles from './CamperInfo.module.css';

const CamperInfo = ({ rating, reviewsCount, location }) => {
  return (
    <div className={styles.camperContentTop}>
      <div className={styles.rating}>
        <span className={styles.iconStar} />
        <span>{rating} ({reviewsCount} Reviews)</span>
      </div>
      <span className={styles.location}>{location}</span>
    </div>
  );
};

export default CamperInfo;
