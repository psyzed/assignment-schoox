import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'scx-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchForm!: FormGroup;
  private subscription = new Subscription();
  @Output() search = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchTerm: ['', Validators.required],
    });

    this.searchForm.valueChanges
      .pipe(debounceTime(750), distinctUntilChanged())
      .subscribe((value) => this.search.emit(value.searchTerm));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
