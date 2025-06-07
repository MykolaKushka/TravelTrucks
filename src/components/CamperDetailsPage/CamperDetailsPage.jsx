import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCamperDetails } from '../../api/campersApi';
import styles from './CamperDetailsPage.module.css';
import iconStyles from '../../styles/IconStyles.module.css';
import CamperInfo from '../CamperInfo/CamperInfo';
import BookingForm from '../BookingForm/BookingForm';

const CamperDetailsPage = () => {
  const { id } = useParams();
  const [camper, setCamper] = useState(null);
  const [activeTab, setActiveTab] = useState('features');

  useEffect(() => {
    const loadCamper = async () => {
      const data = await fetchCamperDetails(id);
      setCamper(data);
    };
    loadCamper();
  }, [id]);

  if (!camper) {
    return <div className={styles.loader}>Loading...</div>;
  }

  const {
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
    form,
    length,
    width,
    height,
    tank,
    consumption,
  } = camper;

  const features = [
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

  return (
    <div className={styles.detailsPage}>
      <h1>{name}</h1>
      <CamperInfo
        rating={rating}
        reviewsCount={reviews.length}
        location={location}
      />
      <p className={styles.price}>€{price.toFixed(2)}</p>

      <div className={styles.gallery}>
        {gallery.map((img, index) => (
          <img key={index} src={img.thumb} alt={name} />
        ))}
      </div>

      <p className={styles.description}>{description}</p>

      <div className={styles.tabs}>
        <button
          className={activeTab === 'features' ? styles.active : ''}
          onClick={() => setActiveTab('features')}
        >
          Features
        </button>
        <button
          className={activeTab === 'reviews' ? styles.active : ''}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.tabContent}>
          {activeTab === 'features' && (
            <div className={styles.featuresTab}>
              <div className={styles.features}>
                {features
                  .filter(f => f.value)
                  .map(f => (
                    <span key={f.label} className={styles.featureItem}>
                      <span className={`${iconStyles.icon} ${iconStyles[`icon_${f.iconClass}`]}`} />
                      {f.label}
                    </span>
                  ))}
              </div>

              <div className={styles.details}>
                <h4>Vehicle details</h4>
                <dl>
                  <dt>Form:</dt>
                  <dd>{form}</dd>
                  <dt>Length:</dt>
                  <dd>{length}</dd>
                  <dt>Width:</dt>
                  <dd>{width}</dd>
                  <dt>Height:</dt>
                  <dd>{height}</dd>
                  <dt>Tank:</dt>
                  <dd>{tank}</dd>
                  <dt>Consumption:</dt>
                  <dd>{consumption}</dd>
                </dl>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className={styles.reviewsTab}>
                {reviews.map((r, index) => (
                <div key={index} className={styles.review}>
                    <div className={styles.reviewerInfo}>
                    <div className={styles.reviewerAvatar}>
                        {r.reviewer_name.charAt(0)}
                    </div>
                    <div>
                        <p className={styles.reviewerName}>{r.reviewer_name}</p>
                        <div className={styles.reviewStars}>
                            {Array.from({ length: 5 }, (_, i) => (
                                <span
                                key={i}
                                className={`${styles.starIcon} ${
                                    i >= r.reviewer_rating ? styles.starIconEmpty : ''
                                }`}
                                />
                            ))}
                        </div>
                    </div>
                    </div>
                    <p className={styles.reviewText}>{r.comment}</p>
                </div>
                ))}
            </div>
          )}
        </div>

        <BookingForm />
      </div>
    </div>
  );
};

export default CamperDetailsPage;
