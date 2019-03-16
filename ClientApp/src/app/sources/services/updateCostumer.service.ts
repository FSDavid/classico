import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/internal/operators';
import {Router} from '@angular/router';
import * as moment from 'moment';


@Injectable()
export class UpdateCostumerService {

  constructor(private httpClient: HttpClient, private router: Router) {}


  addComment(comment: string) {
    return this.httpClient.put('api/updateuserinfo/comment?comment='+comment, {
      observe: 'body',
      responseType: 'json',
    }).pipe(
      map(data => {
         return data;
        }
      )
    );

  }


  updateFirstName(firstName: string) {
    return this.httpClient.put('api/updateuserinfo/firstname?firstName='+ firstName, {}).pipe(map(data => {return data;}));
  }
  updateLastName(lastName: string) {
    return this.httpClient.put('api/updateuserinfo/lastname?lastName='+ lastName, {}).pipe(map(data => {return data;}));
  }
  updateFullName(firstName: string, lastName: string) {
    return this.httpClient.put('api/updateuserinfo/fullname?firstName=' + firstName + '&lastName=' + lastName, {}).pipe(map(data => {return data;}));
  }
  addLink(link: string) {
    return this.httpClient.put('api/updateuserinfo/link?link=' + link, {}).pipe(map(data => {return data;}));
  }
  addAge(date: string) {
    const isoDate = moment(new Date(date)).format();
    return this.httpClient.put('api/updateuserinfo/date?date='+ isoDate, {}).pipe(map(data => {return data;}));
  }
  updateEmail(email: string) {
    return this.httpClient.put('api/updateuserinfo/email?email='+ email, {}).pipe(map(data => {return data;}));
  }

  addNumber(number: string) {
    return this.httpClient.put('api/updateuserinfo/number?number='+number, {}).pipe(map(data => {return data;}));
  }

  addTeam(team: string) {
    return this.httpClient.put('api/updateuserinfo/team?team='+team, {}).pipe(map(data => {return data;}));
  }

  addClub(club: string) {
    return this.httpClient.put('api/updateuserinfo/club?club='+club, {}).pipe(map(data => {return data;}));
  }
  setFbPicture() {
    return this.httpClient.get('api/updateuserinfo/setfbimage').pipe(map(data => {return data;}));
  }

  uploadPicture(file: any) {
    let input = new FormData();
    input.append("filesData", file);
    return this.httpClient.post('api/updateuserinfo/image', input, {
      observe: 'body',
      responseType: 'text'
    }).pipe(map(data => {return data;}));
  }




}
