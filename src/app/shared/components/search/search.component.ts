import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  @Output() searchQuery = new EventEmitter<string>();

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.searchQuery.emit(query.trim().toLowerCase());
  }
}
