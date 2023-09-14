import { Component, OnInit } from '@angular/core';
import { ListService } from './list.service';
import { Observable, Subject, map, startWith, switchMap } from 'rxjs';
import { Todo } from './models';
@Component({
  selector: 'scx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  allTodos: Todo[] = [];
  todos: Todo[] = [];
  noTodosFound = false;
  isLoading$ = this.listService.isLoading;
  hasError$ = this.listService.hasError;

  constructor(private listService: ListService) {}

  ngOnInit(): void {
    this.listService.getList().subscribe((todos) => {
      this.allTodos = todos;
      this.todos = todos;
    });
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
}
