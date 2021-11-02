import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import {persistReducer, persistStore} from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['APPSTATE'],
};
const persistedReducer = persistReducer(persistConfig, reducer);
const Store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(Store);

module.exports = {Store, persistor};
