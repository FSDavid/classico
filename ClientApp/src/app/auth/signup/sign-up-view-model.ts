export class SignupViewmodel {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  location: string;

  constructor (  email: string, password: string, firstName: string, lastName: string, location: string) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.location = location;
  }

}
