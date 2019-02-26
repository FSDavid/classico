export class UserModel {

  firstName: string;
  lastName: string;
  pictureUrl: string;
  facebookId: string;
  location: string;
  locale: string;
  userLink: string;

  constructor (
    firstName: string,
    lastName: string,
    pictureUrl: string,
    facebookId: string,
    location: string,
    locale: string,
    userLink: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.pictureUrl = pictureUrl;
    this.facebookId = facebookId;
    this.location = location;
    this.locale = locale;
    this.userLink = userLink;
  }
}


