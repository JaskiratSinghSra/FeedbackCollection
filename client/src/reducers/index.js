import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form'; // rename importing variable
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

export default combineReducers({
  auth: authReducer, //auth piece of state mainted by authreducer
  form: reduxForm,
  surveys: surveysReducer
});

// key used to store output
//value available on key
