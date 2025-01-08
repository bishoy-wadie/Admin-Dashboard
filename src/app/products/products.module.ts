import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProductsComponent, AddEditProductComponent],
  imports: [CommonModule, ProductsRoutingModule, SharedModule],
})
export class ProductsModule {}
