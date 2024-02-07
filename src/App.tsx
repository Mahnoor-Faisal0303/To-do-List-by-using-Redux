import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import SignupScreen from './Pages/SignupScreen';
import LoginScreen from './Pages/LoginScreen';
import { useSelector } from 'react-redux';
import { RootState } from './store';

function App() {
  const isLoggedIn = useSelector((state: RootState) => state.logins.isLoggedIn);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />        
        <Route path="/home" element={isLoggedIn ? <Home/> : <Navigate to="/" /> } />
        <Route path="/Signup" element={<SignupScreen />} />
      </Routes>
    </Router>
  );
}
export default App;
