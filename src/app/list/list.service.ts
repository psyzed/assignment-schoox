import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './models';
import { BehaviorSubject, catchError, of, tap, throwError } from 'rxjs';

@Injectable()
export class ListService {
  private readonly httpClient = inject(HttpClient);

  private todos: Todo[] = [];
  isLoading = new BehaviorSubject<boolean>(false);
  hasError = new BehaviorSubject<boolean>(false);

  getList() {
    if (this.todos.length === 0) {
      this.isLoading.next(true);
      return this.httpClient
        .get<Todo[]>('https://jsonplaceholder.typicode.com/todos/')
        .pipe(
          tap(
            (todos) => {
              this.isLoading.next(false);
              this.todos = todos;
            },
            catchError((error) => {
              this.hasError.next(true);
              this.isLoading.next(false);
              return throwError(() => new Error('Something went wrong'));
            })
          )
        );
    } else {
      return of(this.todos);
    }
  }
}
