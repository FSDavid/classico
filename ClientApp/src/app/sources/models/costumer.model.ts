export class CostumerModel {
  isOwner: boolean;
  firstName: string;
  lastName: string;
  pictureUrl: string;
  facebookId: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  comment: string;
  favoriteClub: string;
  favoriteNationalTeam: string;
  location: string;
  userLink: string;


  constructor (
    firstName: string,
    lastName: string,
    pictureUrl: string,
    facebookId: string,
    email: string,
    dateOfBirth: string,
    phoneNumber: string,
    comment: string,
    favoriteClub: string,
    favoriteNationalTeam: string,
    location: string,
    userLink: string,
    isOwner: boolean,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.pictureUrl = pictureUrl;
    this.facebookId = facebookId;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.phoneNumber = phoneNumber;
    this.comment = comment;
    this.favoriteClub = favoriteClub;
    this.favoriteNationalTeam = favoriteNationalTeam;
    this.location = location;
    this.userLink = userLink;
    this.isOwner = isOwner;
  }
}


