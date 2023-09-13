import { Component } from '@angular/core';
import { ListService } from './list.service';
import { Observable, Subject, map, startWith, switchMap } from 'rxjs';
import { Todo } from './models';
@Component({
  selector: 'scx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  private searchTerm$ = new Subject<string>();
  todos$: Observable<Todo[]>;

  constructor(private listService: ListService) {
    this.todos$ = this.searchTerm$.pipe(
      startWith(''), // Start with no filter
      switchMap((term: string) =>
        this.listService
          .getList()
          .pipe(
            map((todos) =>
              todos.filter((todo) =>
                todo.title.toLowerCase().includes(term.toLowerCase())
              )
            )
          )
      )
    );
  }

  filter(searchTerm: string) {
    this.searchTerm$.next(searchTerm);
  }
}
