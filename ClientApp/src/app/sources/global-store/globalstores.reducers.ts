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
  userInfo: (new UserModel('', '', '', '', '', '', '', ''))
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
      case (globalStoreActions.UPDATE_FIRST_NAME) :
        let updateUser = state.userInfo;
        updateUser.firstName = action.payload;
        return {
        ...state,
        userInfo: updateUser
        };
      case (globalStoreActions.UPDATE_LAST_NAME) :
        let updateUserLastName = state.userInfo;
        updateUserLastName.lastName = action.payload;
        return {
         ...state,
         userInfo: updateUserLastName
        };
      case (globalStoreActions.UPDATE_LINK) :
        let updateUserLink = state.userInfo;
        updateUserLink.userLink = action.payload;
        return {
         ...state,
         userInfo: updateUserLink
        };
      case (globalStoreActions.UPDATE_PICTURE) :
        let updatePicture = state.userInfo;
        updatePicture.pictureUrl = action.payload;
        return {
          ...state,
          userInfo: updatePicture
        };
      case (globalStoreActions.SET_FB_PICTURE) :
        let SetFbPicture = state.userInfo;
        SetFbPicture.pictureUrl = SetFbPicture.facebookProfilePicture;
        return {
          ...state,
          userInfo: SetFbPicture
        };

      default:
        return state;
  }
}
