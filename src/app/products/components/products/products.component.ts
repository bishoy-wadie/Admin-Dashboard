import { Component, OnInit } from '@angular/core';
import { Column } from '../../../shared/components/table/column';
import { ProductsService } from '../../products.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  tableColumns: Array<Column> = [
    {
      columnDef: 'id',
      header: 'ID',
      cell: (element: Record<string, any>) => `${element['id']}`,
      type: 'text',
    },
    {
      columnDef: 'image',
      header: 'Image',
      cell: (element: Record<string, any>) => `${element['image']}`,
      type: 'image',
    },
    {
      columnDef: 'title',
      header: 'Title',
      cell: (element: Record<string, any>) => `${element['title']}`,
      type: 'text',
    },
    {
      columnDef: 'category',
      header: 'Category',
      cell: (element: Record<string, any>) => `${element['category']}`,
      type: 'text',
    },
    {
      columnDef: 'price',
      header: 'Price',
      cell: (element: Record<string, any>) => `${element['price']}`,
      type: 'text',
    },
    {
      columnDef: 'edit',
      header: 'Edit',
      cell: (element: Record<string, any>) => `${element['edit']}`,
      type: 'icon',
      icon: 'edit',
    },
    {
      columnDef: 'delete',
      header: 'Delete',
      cell: (element: Record<string, any>) => `${element['Delete']}`,
      type: 'icon',
      icon: 'delete',
    },
  ];

  tableData: Array<any> = [];
  filteredTableData: Array<any> = [];

  isLoading: boolean = false;

  constructor(
    private productsService: ProductsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.isLoading = true;
    this.productsService
      .getProducts()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (res) => {
          this.tableData = res;
          this.filteredTableData = this.tableData;
        },
        (err) => {
          this.toastr.error(err?.message);
        }
      );
  }

  onSearch(query: string) {
    if (!query) {
      this.filteredTableData = this.tableData;
    } else {
      this.filteredTableData = this.tableData.filter((item) => {
        return (
          item.title.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
        );
      });
    }
  }

  handleIconClick(event: { action: string; data: any }) {
    const { action, data } = event;
    if (action === 'edit') {
      // this.editProduct(data);
    } else if (action === 'delete') {
      this.deleteProduct(data);
    }
  }

  deleteProduct(data: any) {}
}
