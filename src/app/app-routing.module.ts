import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'login', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) }, { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }, { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) }, { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
