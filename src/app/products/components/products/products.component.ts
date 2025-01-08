import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('deleteModal') deleteModal!: ElementRef<HTMLDialogElement>;
  @ViewChild('addEditModal') addEditModal!: ElementRef<HTMLDialogElement>;
  productIdToDelete!: number;

  isLoading: boolean = false;
  isUpdating: boolean = false;
  isEditMode = false;
  productToEdit: any;

  constructor(
    private productsService: ProductsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.productsService.productsSubject.subscribe((products) => {
      this.filteredTableData = products;
    });
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
          this.productsService.productsSubject.next(this.tableData);
        },
        (err) => {
          this.toastr.error(err?.message);
        }
      );
  }

  onSearch(query: string) {
    if (!query) {
      this.filteredTableData = this.productsService.productsSubject.value;
    } else {
      this.filteredTableData =
        this.productsService.productsSubject?.value?.filter((item) => {
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
      this.openEditProductModal(data);
    } else if (action === 'delete') {
      this.openDeleteProductModal(data?.id);
    }
  }

  openEditProductModal(product: any) {
    this.isEditMode = true;
    this.productToEdit = product;

    this.addEditModal.nativeElement.showModal();
  }

  openDeleteProductModal(id: number) {
    this.productIdToDelete = id;
    this.deleteModal.nativeElement.showModal();
  }

  openAddProductModal() {
    this.isEditMode = false;
    this.productToEdit = null;
    this.addEditModal.nativeElement.showModal();
  }

  closeDeleteProductModal() {
    this.deleteModal.nativeElement.close();
  }

  confirmDelete() {
    this.isUpdating = true;
    this.productsService
      .deleteProduct(this.productIdToDelete)
      .pipe(
        finalize(() => {
          this.isUpdating = false;
        })
      )
      .subscribe(
        (res) => {
          this.toastr.success('Product deleted successfully!');
          this.closeDeleteProductModal();
        },
        (error) => {
          this.toastr.error('Error deleting product:', error);
        }
      );
  }
}
