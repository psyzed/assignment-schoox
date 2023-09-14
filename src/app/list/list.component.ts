import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListService } from './list.service';
import { Todo } from './models';
import { Subscription } from 'rxjs';
@Component({
  selector: 'scx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  allTodos: Todo[] = [];
  todos: Todo[] = [];
  noTodosFound = false;
  isLoading$ = this.listService.isLoading;
  hasError$ = this.listService.hasError;
  private subscriptions = new Subscription();

  constructor(private listService: ListService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.listService
        .getList()
        .pipe()
        .subscribe((todos) => {
          this.allTodos = todos;
          this.todos = todos;
        })
    );
  }

  filter(searchTerm: string) {
    if (!searchTerm) {
      this.noTodosFound = false;
      this.todos = [...this.allTodos];
    } else {
      this.todos = this.allTodos.filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      this.noTodosFound = this.todos.length === 0;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
