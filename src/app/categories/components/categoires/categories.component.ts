import { Component, OnInit } from '@angular/core';
import { Column } from '../../../shared/components/table/column';
import { CategoriesService } from '../../categories.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  tableColumns: Array<Column> = [
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element: Record<string, any>) => `${element}`,
      type: 'text',
    },
  ];

  tableData: Array<any> = [];
  isLoading: boolean = false;

  constructor(
    private categoriesService: CategoriesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.isLoading = true;
    this.categoriesService
      .getCategories()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (res) => {
          this.tableData = res;
        },
        (err) => {
          this.toastr.error(err?.message);
        }
      );
  }
}
