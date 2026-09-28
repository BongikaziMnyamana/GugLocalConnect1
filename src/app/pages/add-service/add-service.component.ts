import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BusinessService } from '../../core/services/business.service';

@Component({
  selector: 'app-add-service',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.css'
})
export class AddServiceComponent {
  form = this.fb.group({
    title: ['', Validators.required],
    price: ['', [Validators.required, Validators.min(0)]],
    description: ['', Validators.required]
  });
  errorMessage = '';

  constructor(private fb: FormBuilder, private businessService: BusinessService, private router: Router) {}

  submit() {
    if (this.form.invalid) return;
    const { title, price, description } = this.form.getRawValue();
    this.businessService.addService({
      title: title as string,
      price: Number(price),
      description: description as string
    }).subscribe({
      next: () => this.router.navigate(['/my-services']),
      error: (err) => { this.errorMessage = err?.error?.message || 'Could not add service.'; }
    });
  }
}
