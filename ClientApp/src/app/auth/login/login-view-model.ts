export class LoginViewModel {
  username: string;
  password: string;
  constructor (username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

export class RefreshTokenViewModel {
  username: string;
  ref_token: string;
  constructor (username: string, ref_token: string) {
    this.username = username;
    this.ref_token = ref_token;
  }
}
export class ForgetEmailViewModel {
  email: string;
  constructor (email: string) {
    this.email = email;
  }
}
