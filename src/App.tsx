import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import LoginScreen from './Pages/LoginScreen';
import APP_ROUTES from './Constant/Routes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={APP_ROUTES.LOGIN_PAGE} element={<LoginScreen />} />
        <Route path={APP_ROUTES.HOME_PAGE} element={<Home />} />
      </Routes>
    </Router>
  );
}
export default App;