import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppConst} from '../../constants/app-const';
import {Router} from '@angular/router';

@Injectable()
export class LoginService {
  private _serverPath: string = AppConst.FULL_API_BASE_PATH;

  constructor(private http: Http, private router: Router) { }

  public sendCredential(username: string, password: string): Observable<Response> {
    const url = this._serverPath + '/token';
    const encodedCredentials = btoa(username + ':' + password);
    const basicHeader = 'Basic ' + encodedCredentials;
    const headers = new Headers({
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Authorization' : basicHeader
    });

    return this.http.get(url, {headers: headers});
  }

  public checkSession(): Observable<Response> {
    const url = this._serverPath + '/session/active';
    const headers = new Headers({
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, {headers: headers});
  }

  public logout(): Observable<Response> {
    const url = this._serverPath + '/user/logout';
    const headers = new Headers({
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, '', {headers: headers});
  }

}
