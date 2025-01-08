import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../products.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css',
})
export class AddEditProductComponent implements OnInit {
  productForm!: FormGroup;
  imagePreview: string = 'assets/thumbnail.svg';
  isLoading: boolean = false;
  @Input() modal!: HTMLDialogElement;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.productForm = this.fb.group({
      image: [null, Validators.required],
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(30),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(50),
          Validators.maxLength(100),
        ],
      ],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.1)]],
    });
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
    this.productsService
      .addProduct(formData)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.closeModal();
        })
      )
      .subscribe(
        (res) => {
          this.toastr.success('Product created successfully');
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
