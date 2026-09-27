import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookingService } from '../../core/services/booking.service';
import { BusinessService } from '../../core/services/business.service';
import { Business, ServiceItem } from '../../core/models/models';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {
  businessId!: number;
  business?: Business;
  services: ServiceItem[] = [];
  errorMessage = '';
  success = false;

  form = this.fb.group({
    serviceId: ['', Validators.required],
    date: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private businessService: BusinessService
  ) {}

  ngOnInit() {
    this.businessId = Number(this.route.snapshot.paramMap.get('businessId'));
    this.businessService.getById(this.businessId).subscribe({ next: (b) => this.business = b, error: () => {} });
    this.businessService.getServicesForBusiness(this.businessId).subscribe({
      next: (s) => this.services = s,
      error: () => {}
    });
  }

  submit() {
    if (this.form.invalid) return;
    const { serviceId, date } = this.form.getRawValue();
    this.bookingService.create({
      businessId: this.businessId,
      serviceId: Number(serviceId),
      date: date as string
    }).subscribe({
      next: () => { this.success = true; },
      error: (err) => { this.errorMessage = err?.error?.message || 'Could not create booking.'; }
    });
  }
}