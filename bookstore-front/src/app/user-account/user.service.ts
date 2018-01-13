import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AppConst } from '../constants/app-const';
import { User } from './user.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {
  private serverPath: string = AppConst.serverPath;

  constructor(private http: Http) { }

  newUser(username: string, email: string): Observable<Response> {
    const url = this.serverPath + '/user/newUser';
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

  updateUserInfo(user: User, newPassword: string, currentPassword: string): Observable<Response> {
    const url = this.serverPath + '/user/updateUserInfo';
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

  retrievePassword(email: string): Observable<Response> {
    const url = this.serverPath + '/user/forgetPassword';
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
    const url = this.serverPath + '/user/getCurrentUser';

    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, {headers : tokenHeader});
  }

}
