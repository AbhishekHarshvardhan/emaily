import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => {
  return async function(dispatch) {
    const { data: user } = await axios.get('/api/current_user');
    console.log(user);
    dispatch({ type: FETCH_USER, payload: user });
  };
};

export const handleToken = token => {
  return async function(dispatch) {
    const { data: user } = await axios.post('/api/stripe', token);
    dispatch({ type: FETCH_USER, payload: user });
  };
};
