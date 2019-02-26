import * as globalStoreActions from './global-store.actions';
import {WeatherForecast} from '../../fetch-data/fetch-data.component';
import {UserModel} from '../models/user.model';


export interface GlobalstoresState {
  globalStores: State;
}

export interface  State {
  weathers: WeatherForecast[];
  userInfo: UserModel;
}

const initialState: State = {
  weathers: [],
  userInfo: (new UserModel('','','','','','',''))
};

export function globalStoresReducer (state = initialState, action: globalStoreActions.GstoreActions) {
  switch (action.type) {
    case (globalStoreActions.SET_WEATHER_FORECASTS) :
      return {
        ...state,
        weathers: action.payload
      };
      case (globalStoreActions.SET_USER_INFO) :
      return {
        ...state,
        userInfo: action.payload
      };

    default:
      return state;
  }
}
