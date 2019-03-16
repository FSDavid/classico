
import {Action} from '@ngrx/store';
import {WeatherForecast} from '../../fetch-data/fetch-data.component';
import {UserModel} from '../models/user.model';

export const GET_WEATHER_FORECASTS = 'GET_WEATHER_FORECASTS';
export const SET_WEATHER_FORECASTS = 'SET_WEATHER_FORECASTS';
export const GET_USER_INFO = 'GET_USER_INFO';
export const SET_USER_INFO = 'SET_USER_INFO';
export const UPDATE_FIRST_NAME = 'UPDATE_FIRST_NAME';
export const UPDATE_LAST_NAME = 'UPDATE_LAST_NAME';
export const UPDATE_LINK = 'UPDATE_LINK';
export const UPDATE_PICTURE = 'UPDATE_PICTURE';
export const SET_FB_PICTURE = 'SET_FB_PICTURE';

export class GetWeatherForecasts implements Action {
  readonly type = GET_WEATHER_FORECASTS;
  // constructor (public payload: string) {}
}

export class SetWeatherForecasts implements Action {
  readonly type = SET_WEATHER_FORECASTS;
  constructor (public payload: WeatherForecast[]) {}
}

export class GetUserInfo implements Action {
  readonly type = GET_USER_INFO;
}
export class SetUserInfo implements Action {
  readonly type = SET_USER_INFO;
  constructor (public payload: UserModel) {}
}

export class UpdateFirstName implements Action {
  readonly type = UPDATE_FIRST_NAME;
  constructor (public payload: string) {}
}
export class UpdateLastName implements Action {
  readonly type = UPDATE_LAST_NAME;
  constructor (public payload: string) {}
}
export class UpdateLink implements Action {
  readonly type = UPDATE_LINK;
  constructor (public payload: string) {}
}
export class UpdatePicture implements Action {
  readonly type = UPDATE_PICTURE;
  constructor (public payload: string) {}
}
export class SetFbPicture implements Action {
  readonly type = SET_FB_PICTURE;
}


export type GstoreActions =
  GetWeatherForecasts |
  SetWeatherForecasts |
  GetUserInfo |
  SetUserInfo |
  UpdateFirstName |
  UpdateLastName |
  UpdateLink |
  UpdatePicture |
  SetFbPicture;
