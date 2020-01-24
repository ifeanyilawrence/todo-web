import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Todo } from '../models/todo';

import { environment } from '../../environments/environment';

const loggedUser = localStorage.getItem('currentUser');

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', "Authorization": `Bearer `})
  // headers: new HttpHeaders({'Content-Type': 'application/json', "Authorization": `Bearer ${loggedUser['token']}`})
};
const apiUrl = `${environment.apiUrl}/tasks`;
//const apiUrl = "http://localhost:3000/tasks";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); // log to console
  
      return of(result as T);
    };
  }

  getTodoList(): Observable<Todo[]> {
    return this.http.get<Todo[]>(apiUrl, httpOptions)
      .pipe(
        tap(todo => console.log('fetched todolist')),
        catchError(this.handleError('getTodoList', []))
      );
  }
  
  getTask(id: string): Observable<Todo> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Todo>(url, httpOptions).pipe(
      tap(_ => console.log(`fetched todo id=${id}`)),
      catchError(this.handleError<Todo>(`getTask id=${id}`))
    );
  }
  
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(apiUrl, todo, httpOptions).pipe(
      tap((todo: Todo) => console.log(`added todo w/ id=${todo._id}`)),
      catchError(this.handleError<Todo>('addTodo'))
    );
  }
  
  updateTodo(id: any, todo: Todo): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, todo, httpOptions).pipe(
      tap(_ => console.log(`updated todo id=${id}`)),
      catchError(this.handleError<any>('updateTodo'))
    );
  }
  
  deleteTodo(id: any): Observable<Todo> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Todo>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted todo id=${id}`)),
      catchError(this.handleError<Todo>('deleteTodo'))
    );
  }
}
