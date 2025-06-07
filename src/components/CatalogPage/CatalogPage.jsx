import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCampers, resetFilters } from '../../redux/campersSlice';
import { fetchCampers } from '../../api/campersApi';
import Sidebar from '../Sidebar/Sidebar';
import CamperCard from '../CamperCard/CamperCard';
import styles from './CatalogPage.module.css';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { campers, selectedFilters } = useSelector((state) => state.campers);

  const [visibleCount, setVisibleCount] = useState(4);

  // ✅ Скидання фільтрів при монтуванні сторінки
  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  // ✅ Отримуємо дані кемперів (з фільтрами або всі)
  useEffect(() => {
    const loadCampers = async () => {
      const campersData = await fetchCampers(selectedFilters);
      dispatch(setCampers(campersData));
      setVisibleCount(4); // Скидаємо лічильник при новому запиті
    };

    loadCampers();
  }, [dispatch, selectedFilters]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <div className={styles.catalogPage}>
      <Sidebar />

      <div className={styles.camperList}>
        {campers && campers.length > 0 ? (
          campers.slice(0, visibleCount).map((c) => (
            <CamperCard key={c.id} camper={c} />
          ))
        ) : (
          <div>Немає доступних кемперів</div>
        )}

        {visibleCount < campers.length && (
          <div className={styles.loadMoreWrapper}>
            <button
              onClick={handleLoadMore}
              className={styles.loadMoreButton}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
