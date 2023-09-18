import { Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import CONSTANTS from './constants';
import { refresh } from './redux/slices/authSlice';
import ChatPage from './pages/Chat';

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
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/chat' component={ChatPage} />
      </Switch>
    </>
  );
}

export default App;
