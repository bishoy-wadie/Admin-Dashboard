import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TableComponent } from './components/table/table.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TableSkeletonComponent } from './components/table-skeleton/table-skeleton.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    TableComponent,
    NotFoundComponent,
    TableSkeletonComponent,
    SearchComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    NavbarComponent,
    SidebarComponent,
    TableComponent,
    TableSkeletonComponent,
    SearchComponent,
  ],
})
export class SharedModule {}
