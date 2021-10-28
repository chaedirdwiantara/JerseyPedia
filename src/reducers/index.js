import {combineReducers} from 'redux';
import UserReducer from './user';
import RajaOngkirReducer from './rajaongkir';
import AuthReducer from './auth';
import ProfileReducer from './profile';
import LigaReducer from './liga';
import JerseyReducer from './jersey';
import KeranjangReducer from './keranjang';

const rootReducer = combineReducers({
  UserReducer,
  RajaOngkirReducer,
  AuthReducer,
  ProfileReducer,
  LigaReducer,
  JerseyReducer,
  KeranjangReducer,
});

export default rootReducer;
