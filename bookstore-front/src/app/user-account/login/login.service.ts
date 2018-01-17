import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppConst} from '../../constants/app-const';
import {Router} from '@angular/router';

@Injectable()
export class LoginService {
  private serverPath: string = AppConst.FULL_API_BASE_PATH;

  constructor(private http: Http, private router: Router) { }

  sendCredential(username: string, password: string): Observable<Response> {
    const url = this.serverPath + '/token';
    const encodedCredentials = btoa(username + ':' + password);
    const basicHeader = 'Basic ' + encodedCredentials;
    const headers = new Headers({
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Authorization' : basicHeader
    });

    return this.http.get(url, {headers: headers});
  }

  checkSession(): Observable<Response> {
    const url = this.serverPath + '/session/active';
    const headers = new Headers({
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, {headers: headers});
  }

  logout(): Observable<Response> {
    const url = this.serverPath + '/user/logout';
    const headers = new Headers({
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, '', {headers: headers});
  }

}
