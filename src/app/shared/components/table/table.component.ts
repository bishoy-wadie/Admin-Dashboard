import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Column } from './column';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent<T> implements OnInit {
  @Input() tableColumns: Array<Column> = [];
  @Input() tableData: Array<T> = [];
  @Output() iconClick = new EventEmitter<{ action: string; data: any }>();

  displayedColumns: Array<string> = [];

  ngOnInit() {
    this.displayedColumns = this.tableColumns.map((c) => c.columnDef);
  }

  onIconClick(action: any, data: any) {
    this.iconClick.emit({ action, data });
  }
}
