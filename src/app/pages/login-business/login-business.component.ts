import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login-business',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login-business.component.html',
  styleUrl: './login-business.component.css'
})
export class LoginBusinessComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  errorMessage = '';
  loading = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.errorMessage = '';
    this.auth.loginBusiness(this.form.getRawValue() as any).subscribe({
      next: () => this.router.navigate(['/dashboard/business']),
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'Login failed. Check your details and try again.';
      }
    });
  }
}
