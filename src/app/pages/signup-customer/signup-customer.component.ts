import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-signup-customer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup-customer.component.html',
  styleUrl: './signup-customer.component.css'
})
export class SignupCustomerComponent {
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  errorMessage = '';
  loading = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.errorMessage = '';
    this.auth.registerCustomer(this.form.getRawValue() as any).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'Could not create account. Try a different email.';
      }
    });
  }
}