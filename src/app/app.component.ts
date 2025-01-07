import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Admin-Dashboard';
  showSidebarAndNavbar: boolean = true;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.router.url;
        //not best practice need to be handled as layout
        this.showSidebarAndNavbar =
          currentRoute.includes('/dashboard') ||
          currentRoute.includes('/products') ||
          currentRoute.includes('/categories');
      });
  }
}
