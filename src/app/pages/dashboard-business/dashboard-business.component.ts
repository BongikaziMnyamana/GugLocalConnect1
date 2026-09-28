import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BusinessService } from '../../core/services/business.service';
import { BookingService } from '../../core/services/booking.service';
import { AuthService } from '../../core/services/auth.service';
import { Business, Booking } from '../../core/models/models';

@Component({
  selector: 'app-dashboard-business',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './dashboard-business.component.html',
  styleUrl: './dashboard-business.component.css'
})
export class DashboardBusinessComponent implements OnInit {
  profile?: Business;
  bookings: Booking[] = [];
  loading = true;
  editingProfile = false;
  savingProfile = false;

  profileForm = this.fb.group({
    name: ['', Validators.required],
    location: ['', Validators.required],
    description: ['']
  });

  constructor(
    private fb: FormBuilder,
    private businessService: BusinessService,
    private bookingService: BookingService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.loadProfile();
    this.bookingService.getMyBookings().subscribe({
      next: (b) => { this.bookings = b; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  loadProfile() {
    this.businessService.getMyProfile().subscribe({
      next: (p) => {
        this.profile = p;
        this.profileForm.patchValue({
          name: p.name,
          location: p.location,
          description: p.description
        });
      },
      error: () => {}
    });
  }

  toggleEdit() {
    this.editingProfile = !this.editingProfile;
  }

    updateBookingStatus(bookingId: number, status: 'CONFIRMED' | 'CANCELLED' | 'COMPLETED') {
    this.bookingService.updateStatus(bookingId, status).subscribe({
      next: (updated) => {
        const index = this.bookings.findIndex(b => b.id === bookingId);
        if (index !== -1) this.bookings[index] = updated;
      }
    });
  }

  saveProfile() {
    if (this.profileForm.invalid) return;
    this.savingProfile = true;
    const { name, location, description } = this.profileForm.getRawValue();
    this.businessService.updateMyProfile({ name, location, description } as any).subscribe({
      next: (p) => {
        this.profile = p;
        this.savingProfile = false;
        this.editingProfile = false;
      },
      error: () => { this.savingProfile = false; }
    });
  }
}