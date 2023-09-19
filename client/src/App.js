import { Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import CONSTANTS from './constants';
import { refresh } from './redux/slices/authSlice';
import ChatPage from './pages/Chat';
import RegistrationPage from './pages/Registration';
import PrivateRoute from './components/PrivateRoute';
import PublicOnlyRoute from './components/PublicOnlyRoute';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshTokenFromLS = localStorage.getItem(CONSTANTS.REFRESH_TOKEN);

    if (refreshTokenFromLS) {
      dispatch(refresh(refreshTokenFromLS));
    }

  }, []);

  return (
    <>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <PublicOnlyRoute exact path='/login' component={LoginPage} />
        <PublicOnlyRoute exact path='/registration' component={RegistrationPage} />
        <PrivateRoute exact path='/chat' component={ChatPage} />
      </Switch>
    </>
  );
}

export default App;
