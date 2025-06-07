import styles from './CamperCard.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/campersSlice';
import CamperInfo from '../CamperInfo/CamperInfo';
import iconStyles from '../../styles/IconStyles.module.css';

const CamperCard = ({ camper }) => {
  const {
    id,
    name,
    price,
    location,
    description,
    gallery,
    reviews,
    rating,
    transmission,
    engine,
    AC,
    bathroom,
    kitchen,
    TV,
    radio,
    refrigerator,
    microwave,
    gas,
    water,
  } = camper;

  const dispatch = useDispatch();
  const { favorites } = useSelector(state => state.campers);

  const isFavorite = favorites.some(c => c.id === id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(camper));
    } else {
      dispatch(addToFavorites(camper));
    }
  };

  const filters = [
    { label: 'Automatic', value: transmission === 'automatic', iconClass: 'automatic' },
    { label: 'Petrol', value: engine === 'petrol', iconClass: 'petrol' },
    { label: 'AC', value: AC, iconClass: 'ac' },
    { label: 'Bathroom', value: bathroom, iconClass: 'bathroom' },
    { label: 'Kitchen', value: kitchen, iconClass: 'kitchen' },
    { label: 'TV', value: TV, iconClass: 'tv' },
    { label: 'Radio', value: radio, iconClass: 'radio' },
    { label: 'Refrigerator', value: refrigerator, iconClass: 'refrigerator' },
    { label: 'Microwave', value: microwave, iconClass: 'microwave' },
    { label: 'Gas', value: gas, iconClass: 'gas' },
    { label: 'Water', value: water, iconClass: 'water' },
  ];

  const shortDescription =
    description.length > 70 ? description.slice(0, 70) + '...' : description;

  return (
    <div className={styles.camperCard}>
      <img
        src={gallery[0].thumb}
        alt={name}
        className={styles.camperImage}
      />

      <div className={styles.camperContent}>
        <div className={styles.header}>
          <h3 className={styles.name}>{name}</h3>
          <div className={styles.header__rightTop}>
            <span className={styles.price}>€{price.toFixed(2)}</span>
            <button
              onClick={handleFavoriteClick}
              className={`${styles.favoriteButton} ${isFavorite ? styles.active : ''}`}
            >
              <span className={styles.iconHeart} />
            </button>
          </div>
        </div>

        <CamperInfo
          rating={rating}
          reviewsCount={reviews.length}
          location={location}
        />

        <p className={styles.description}>{shortDescription}</p>

        <div className={styles.filters}>
          {filters
            .filter(f => f.value)
            .map(f => (
              <span key={f.label} className={styles.filterItem}>
                <span className={`${iconStyles.icon} ${iconStyles[`icon_${f.iconClass}`]}`} />
                {f.label}
              </span>
            ))}
        </div>

        <div className={styles.actions}>
          <Link
            to={`/catalog/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.showMore}
          >
            Show more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CamperCard;
