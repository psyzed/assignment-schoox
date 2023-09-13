import { Component, OnInit } from '@angular/core';
import { ListService } from './list.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { Todo } from './models';
@Component({
  selector: 'scx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  todos$: Observable<Todo[]>;

  constructor(private listService: ListService) {
    this.todos$ = this.listService.getList();
  }

  filter(searchTerm: string) {
    console.log(searchTerm);
  }
}
