import * as globalStoreActions from './global-store.actions';
import {WeatherForecast} from '../../fetch-data/fetch-data.component';


export interface GlobalstoresState {
  globalStores: State;
}

export interface  State {
  weathers: WeatherForecast[];
}

const initialState: State = {
  weathers: []
};

export function globalStoresReducer (state = initialState, action: globalStoreActions.GstoreActions) {
  switch (action.type) {
    case (globalStoreActions.SET_WEATHER_FORECASTS) :
      return {
        ...state,
        weathers: action.payload
      };

    default:
      return state;
  }
}
