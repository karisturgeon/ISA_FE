//ChatGPT was used to assist with this file
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Index from './pages/Index';
import Register from './pages/Register';
import AdjectivesPage from './pages/AdjectivesPage'
import ActivityPage from './pages/ActivityPage';
import SongPlayer from './pages/SongPlayer'
import axios from 'axios';

import Header from './components/Header';
// Axios Global Configuration
axios.defaults.withCredentials = true;



function App() {
  return (
    <Router>
      <Header />
      <Routes>

        {/* Set Home Page */}
        <Route path="/" element={<Index />} />

        {/* Other Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adjectives" element={<AdjectivesPage />} />
        <Route path="/activities" element={<ActivityPage />} />
        <Route path="/song" element={<SongPlayer />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/index" element={<Index />} />
      </Routes>
    </Router>
  );
}

export default App;
