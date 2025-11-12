import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import titleCard from './assets/title_card.png';
import nonDemonsText from './assets/non-demons_text.png';
import demonsText from './assets/demons_text.png';
import NonDemonPage from './pages/NonDemonPage';
import DemonPage from './pages/DemonPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <img src={titleCard} alt="Geometry Dash Gallery" />
        </header>

        <nav>
          <ul>
            <li>
              <Link to="/non-demons">
                <img src={nonDemonsText} alt="Non-Demons" />
              </Link>
            </li>
            <li>
              <Link to="/demons">
                <img src={demonsText} alt="Demons" />
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/non-demons" element={<NonDemonPage />} />
          <Route path="/demons" element={<DemonPage />} />
        </Routes>

        <footer>
          <p>&copy; 2025 Geometry Dash Gallery</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;