import styles from './Sidebar.module.css';
import { useDispatch } from 'react-redux';
import { setFilters } from '../../redux/campersSlice';
import iconStyles from '../../styles/IconStyles.module.css';

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const location = formData.get('location');

    // ✅ Збираємо ВСІ обрані чекбокси для equipment і type
    const equipment = formData.getAll('equipment');
    const type = formData.getAll('type');

    dispatch(setFilters({
      location,
      equipment,
      type
    }));
  };

  return (
    <aside className={styles.sidebar}>
      <form onSubmit={handleSubmit}>
        <div className={styles.location}>
          <label htmlFor="location">Location</label>
          <div className={styles.inputWrapper}>
            <input
              id="location"
              type="text"
              name="location"
              placeholder="Kyiv"
              defaultValue=""
            />
          </div>
        </div>

        <div className={styles.filters}>
          <h4>Filters</h4>

          <div className={styles.section}>
            <h5>Vehicle equipment</h5>
            <div className={styles.buttonsGrid}>
              <label className={styles.filterItem}>
                <input type="checkbox" name="equipment" value="AC" className={styles.checkbox} />
                <span className={`${styles.icon} ${iconStyles.icon_ac}`}></span>
                AC
              </label>
              <label className={styles.filterItem}>
                <input type="checkbox" name="equipment" value="Automatic" className={styles.checkbox} />
                <span className={`${styles.icon} ${iconStyles.icon_automatic}`}></span>
                Automatic
              </label>
              <label className={styles.filterItem}>
                <input type="checkbox" name="equipment" value="Kitchen" className={styles.checkbox} />
                <span className={`${styles.icon} ${iconStyles.icon_kitchen}`}></span>
                Kitchen
              </label>
              <label className={styles.filterItem}>
                <input type="checkbox" name="equipment" value="TV" className={styles.checkbox} />
                <span className={`${styles.icon} ${iconStyles.icon_tv}`}></span>
                TV
              </label>
              <label className={styles.filterItem}>
                <input type="checkbox" name="equipment" value="Bathroom" className={styles.checkbox} />
                <span className={`${styles.icon} ${iconStyles.icon_bathroom}`}></span>
                Bathroom
              </label>
            </div>
          </div>

          <div className={styles.section}>
            <h5>Vehicle type</h5>
            <div className={styles.buttonsGrid}>
              <label className={styles.filterItem}>
                <input type="checkbox" name="type" value="panelTruck" className={styles.checkbox} />
                <span className={`${styles.icon} ${iconStyles.icon_grid}`}></span>
                Van
              </label>
              <label className={styles.filterItem}>
                <input type="checkbox" name="type" value="fullyIntegrated" className={styles.checkbox} />
                <span className={`${styles.icon} ${iconStyles.icon_grid_3}`}></span>
                Fully Integrated
              </label>
              <label className={styles.filterItem}>
                <input type="checkbox" name="type" value="alcove" className={styles.checkbox} />
                <span className={`${styles.icon} ${iconStyles.icon_grid_2}`}></span>
                Alcove
              </label>
            </div>
          </div>
        </div>

        <div>
          <button type="submit" className={styles.searchButton}>Search</button>
        </div>
      </form>
    </aside>
  );
};

export default Sidebar;
