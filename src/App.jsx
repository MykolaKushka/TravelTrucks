import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CatalogPage from './components/CatalogPage/CatalogPage';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import CamperDetailsPage from './components/CamperDetailsPage/CamperDetailsPage'; // Імпорт компонента
import styles from './App.module.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div className={styles.appContainer}>
      <Router>
        <header className={styles.header}>
          <Navbar />
        </header>
        <div className={styles.content}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:id" element={<CamperDetailsPage />} /> {/* Новий маршрут */}
          </Routes>
        </div>
        <ToastContainer position="top-right" autoClose={4000} />
      </Router>
    </div>
  );
};

export default App;
