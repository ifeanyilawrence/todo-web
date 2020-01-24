import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../models/user';

const loggedUser = localStorage.getItem('currentUser');

console.log(loggedUser);

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', "Authorization": `Bearer `})
};

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getProfile() {
        return this.http.get<User[]>(`${environment.apiUrl}/users/profile`, httpOptions);
    }
}