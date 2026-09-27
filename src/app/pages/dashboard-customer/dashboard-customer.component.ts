import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookingService } from '../../core/services/booking.service';
import { AuthService } from '../../core/services/auth.service';
import { Booking } from '../../core/models/models';

@Component({
  selector: 'app-dashboard-customer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-customer.component.html',
  styleUrl: './dashboard-customer.component.css'
})
export class DashboardCustomerComponent implements OnInit {
  bookings: Booking[] = [];
  loading = true;

  constructor(private bookingService: BookingService, public auth: AuthService) {}

  ngOnInit() {
    this.bookingService.getMyBookings().subscribe({
      next: (b) => { this.bookings = b; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }
}
