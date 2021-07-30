import {combineReducers} from 'redux';
import APP from './appReducer';
import USER from './userReducer';
import ORDERS from './orderReducer';
export default combineReducers({APP, USER, ORDERS});
