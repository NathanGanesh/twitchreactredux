import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import { reducer as formReducer } from 'redux-form';
import apiReducer from './api/apiReducer';

export default combineReducers({
	auth: authReducer,
	form: formReducer,
	streams: apiReducer
});
