import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {

  constructor(private http: Http) {

  }

  sendCredentials(username: string, password: string){
    const url = 'http://localhost:8181/token';
    const encodedCredentials = btoa(username + ':' + password);
    const basicHeader = 'Basic ' + encodedCredentials;
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': basicHeader
    });
    return this.http.get(url, {headers: headers});
  }

  checkLogged(){
    const isLogged = false;
    const url = 'http://localhost:8181/checksession';
    const headers = new Headers({
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.http.get(url, {headers: headers});
  }

  logout(){
    const isLogged = false;
    const url = 'http://localhost:8181/user/logout';
    const headers = new Headers({
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.http.post(url, '', {headers: headers});
  }

}
