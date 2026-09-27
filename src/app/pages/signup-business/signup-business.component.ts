import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { BusinessService } from '../../core/services/business.service';
import { Category } from '../../core/models/models';

@Component({
  selector: 'app-signup-business',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup-business.component.html',
  styleUrl: './signup-business.component.css'
})
export class SignupBusinessComponent implements OnInit {
  categories: Category[] = [];

  form = this.fb.group({
    name: ['', Validators.required],
    businessName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    category: ['', Validators.required],
    location: ['', Validators.required],
    description: ['']
  });
  errorMessage = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private businessService: BusinessService,
    private router: Router
  ) {}

  ngOnInit() {
    this.businessService.getCategories().subscribe({
      next: (cats) => this.categories = cats,
      error: () => {}
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.errorMessage = '';
    this.auth.registerBusiness(this.form.getRawValue() as any).subscribe({
      next: () => this.router.navigate(['/dashboard/business']),
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'Could not create account. Try a different email.';
      }
    });
  }
}