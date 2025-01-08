import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../products.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css',
})
export class AddEditProductComponent implements OnInit, OnChanges {
  productForm!: FormGroup;
  imagePreview!: string;
  isLoading: boolean = false;
  categories: Array<any> = [];
  @Input() modal!: HTMLDialogElement;
  @Input() isEditMode: boolean = false;
  @Input() product: any = null;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getAllCategories();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.isEditMode) {
      this.initializeFormForEdit();
    } else {
      this.initializeFormForNew();
    }
  }

  initializeFormForNew() {
    this.productForm = this.fb.group({
      image: [null, Validators.required],
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(30),
          Validators.maxLength(700),
        ],
      ],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.1)]],
    });
    this.imagePreview = 'assets/thumbnail.svg';
  }

  initializeFormForEdit() {
    this.productForm = this.fb.group({
      image: [this.product?.image, Validators.required],
      title: [
        this.product?.title,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      ],
      description: [
        this.product?.description,
        [
          Validators.required,
          Validators.minLength(30),
          Validators.maxLength(700),
        ],
      ],
      category: [this.product?.category, Validators.required],
      price: [this.product?.price, [Validators.required, Validators.min(0.1)]],
    });
    this.imagePreview = this.product?.image;
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.productForm.patchValue({ image: file });
      this.productForm.get('image')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  addEditProduct() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const formData = this.productForm.value;
    if (this.isEditMode) {
      this.productsService
        .editProduct(this.product?.id, formData)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe(
          (res) => {
            this.toastr.success('Product updated successfully');
            this.closeModal();
          },
          (err) => {
            this.toastr.error(err?.message);
          }
        );
    } else {
      this.productsService
        .addProduct(formData)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe(
          (res) => {
            this.toastr.success('Product created successfully');
            this.closeModal();
          },
          (err) => {
            this.toastr.error(err?.message);
          }
        );
    }
  }

  getAllCategories() {
    this.isLoading = true;
    this.productsService
      .getCategories()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (res) => {
          this.categories = res;
        },
        (err) => {
          this.toastr.error(err?.message);
        }
      );
  }

  closeModal() {
    this.modal.close();
  }
}
