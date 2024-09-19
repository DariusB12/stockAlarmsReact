import './App.css'
import './components/utils/MessageBox.css'
import LogInForm from './components/register/LogInForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/register/RegisterForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogInForm />} /> // for the homepage
        <Route path="/logIn" element={<LogInForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}

export default App
