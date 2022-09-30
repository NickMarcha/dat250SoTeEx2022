import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Todo } from './todo';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private todosUrl = 'api/todos'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** GET todos from the server */
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl).pipe(
      tap((_) => this.log('fetched todos')),
      catchError(this.handleError<Todo[]>('getTodos', []))
    );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getTodoNo404<Data>(id: number): Observable<Todo> {
    const url = `${this.todosUrl}/?id=${id}`;
    return this.http.get<Todo[]>(url).pipe(
      map((todos) => todos[0]), // returns a {0|1} element array
      tap((h) => {
        const outcome = h ? 'fetched' : 'did not find';
        this.log(`${outcome} todo id=${id}`);
      }),
      catchError(this.handleError<Todo>(`getTodo id=${id}`))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getTodo(id: number): Observable<Todo> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.get<Todo>(url).pipe(
      tap((_) => this.log(`fetched todo id=${id}`)),
      catchError(this.handleError<Todo>(`getTodo id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchTodos(term: string): Observable<Todo[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Todo[]>(`${this.todosUrl}/?summary=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found todos matching "${term}"`)
          : this.log(`no todos matching "${term}"`)
      ),
      catchError(this.handleError<Todo[]>('searchTodos', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, this.httpOptions).pipe(
      tap((newTodo: Todo) => this.log(`added todo w/ id=${newTodo.id}`)),
      catchError(this.handleError<Todo>('addTodo'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteTodo(id: number): Observable<Todo> {
    const url = `${this.todosUrl}/${id}`;

    return this.http.delete<Todo>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted todo id=${id}`)),
      catchError(this.handleError<Todo>('deleteTodo'))
    );
  }

  /** PUT: update the hero on the server */
  updateTodo(todo: Todo): Observable<any> {
    return this.http.put(this.todosUrl, todo, this.httpOptions).pipe(
      tap((_) => this.log(`updated todo id=${todo.id}`)),
      catchError(this.handleError<any>('updateTodo'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`TodoService: ${message}`);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
