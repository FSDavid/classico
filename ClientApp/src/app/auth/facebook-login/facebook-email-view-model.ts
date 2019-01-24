export class FacebookEmailViewModel {
  accessToken: string;
  email: string;
  constructor (accessToken: string, email: string) {
    this.accessToken = accessToken;
    this.email = email;
  }
}
