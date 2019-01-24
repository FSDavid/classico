export class ResetPasswordViewModel {
  userId: string;
  token: string;
  password: string;
  constructor (userId: string, token: string, password: string) {
    this.userId = userId;
    this.token = token;
    this.password = password;
  }
}
