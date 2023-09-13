import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './models';
import { catchError, of, tap, throwError } from 'rxjs';

@Injectable()
export class ListService {
  private readonly httpClient = inject(HttpClient);

  private todos: Todo[] = [];

  getList() {
    if (this.todos.length === 0) {
      return this.httpClient
        .get<Todo[]>('https://jsonplaceholder.typicode.com/todos/')
        .pipe(
          tap((todos) => (this.todos = todos)),
          catchError((error) => {
            console.log(error);
            return throwError(() => new Error('Something went wrong'));
          })
        );
    } else {
      return of(this.todos);
    }
  }
}
