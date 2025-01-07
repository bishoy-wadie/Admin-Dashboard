import { Component, Input, OnInit } from '@angular/core';
import { Column } from './column';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent<T> implements OnInit {
  @Input() tableColumns: Array<Column> = [];
  @Input() tableData: Array<T> = [];

  displayedColumns: Array<string> = [];

  ngOnInit() {
    this.displayedColumns = this.tableColumns.map((c) => c.columnDef);
  }
}
