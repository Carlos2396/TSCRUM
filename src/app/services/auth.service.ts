import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  private url:string;
  
  constructor(private http:Http) { 
    this.url = 'localhost:3977/api/';
  }

  login(email: string, password: string): Observable<boolean> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/application/x-www-form-urlencoded');

    return this.http.post(this.url+'login', { email: email, password: password }, {headers: headers}).map(
        (response: Response) => {
            let result = response.json();
            if (result.token) {
                // store jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', JSON.stringify({token: result.token}));
                return true;
            } else {
                return false;
            }
        });
  }

  logout(): void {
      localStorage.removeItem('token');
  }
}
