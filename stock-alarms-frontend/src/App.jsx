import './App.css'
import './components/utils/messageBox/MessageBox.css'
import './components/utils/loadingBox/LoadingBox.css'
import './components/register/RegisterForm.css'
import './components/logIn/LogInForm.css'
import './components/mainPage/components/StockSymbolsContainer.css'

import LogInForm from './components/logIn/LogInForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/register/RegisterForm';
import MainPage from './components/mainPage/MainPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogInForm />} /> // for the homepage
        <Route path="/logIn" element={<LogInForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/mainPage" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App
