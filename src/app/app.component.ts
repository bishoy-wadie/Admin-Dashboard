import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    this.router.events.subscribe(() => {
      this.showSidebarAndNavbar = !this.router.url.includes('/login');
    });
  }
}
