import axios from 'axios'; //AJAX requets
import { FETCH_USER, FETCH_SURVEYS } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token); // gets called whenever we get token from stripe
  dispatch({ type: FETCH_USER, payload: res.data });
}; // sending token to express server. after getting response from server what action to dispatch.
// res.data contains usr model . reducer will pass it along. anything that depends on user model will update
export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);
  history.push('/surveys'); // push used to route to another path
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

//Action creators
//res is output from axios
