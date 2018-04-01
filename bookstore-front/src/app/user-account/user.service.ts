import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AppConst } from '../constants/app-const';
import { User } from './user.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  private serverPath: string = AppConst.FULL_API_BASE_PATH;

  constructor(private http: Http) { }

  public newUser(username: string, email: string): Observable<Response> {
    const url = this.serverPath + '/users/add';
    const userInfo = {
      'username': username,
      'email': email
    };
    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(userInfo), {headers : tokenHeader});
  }

  public updateUserInfo(user: User, newPassword: string, currentPassword: string): Observable<Response> {
    const url = this.serverPath + '/users/' + user.id + '/update';
    const userInfo = {
      'id' : user.id,
      'firstName' : user.firstName,
      'lastName' : user.lastName,
      'username' : user.username,
      'currentPassword' : currentPassword,
      'email' : user.email,
      'newPassword' : newPassword
    };

    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(userInfo), {headers: tokenHeader});
  }

  public retrievePassword(email: string): Observable<Response> {
    const url = this.serverPath + '/users/forgetPassword';
    const userInfo = {
      'email' : email
    };
    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(userInfo), {headers: tokenHeader});
  }

  getCurrentUser(): Observable<Response> {
    const url = this.serverPath + '/users/current';

    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, {headers : tokenHeader});
  }

}
