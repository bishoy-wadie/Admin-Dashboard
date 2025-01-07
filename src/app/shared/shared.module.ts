import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TableComponent } from './components/table/table.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [SidebarComponent, NavbarComponent, TableComponent, NotFoundComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent, SidebarComponent, TableComponent],
})
export class SharedModule {}
