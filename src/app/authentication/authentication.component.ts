import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css',
})
export class AuthenticationComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  passwordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: AuthenticationService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.value;
    this.isLoading = true;
    this.loginService
      .login(username, password)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (res) => {
          this.toastr.success('Login successful');
          localStorage.setItem('authToken', res.token);
          this.router.navigate(['/dashboard']);
        },
        (err) => {
          this.errorMessage =
            err || 'Login failed, please check your credentials.';
          this.toastr.error(this.errorMessage);
        }
      );
  }
}
