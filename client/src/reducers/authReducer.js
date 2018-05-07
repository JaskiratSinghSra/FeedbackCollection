import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
  // application first boots up no clues user logged in
  console.log(action);
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
} // every single time action of fetch user comes we return action payload
