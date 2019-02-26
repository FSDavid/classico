
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, mergeMap} from 'rxjs/internal/operators';
import {throwError} from 'rxjs/index';
import {CostumerModel} from '../models/costumer.model';
import {Router} from '@angular/router';

@Injectable()
export class GetCostumerService {

  constructor(private httpClient: HttpClient, private router: Router) {}


  getInfo(userLink: string) {

    return this.httpClient.get<CostumerModel>('https://localhost:44312/api/dashboard/getclientinfo/' + userLink, {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      map(data => {
         return data;
        }
      ),
      catchError((error) => {


        this.router.navigate(['error-page'] );

        return throwError(error);
      })
    );

  }

}
