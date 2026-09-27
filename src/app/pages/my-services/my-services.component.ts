import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BusinessService } from '../../core/services/business.service';
import { ServiceItem } from '../../core/models/models';

@Component({
  selector: 'app-my-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-services.component.html',
  styleUrl: './my-services.component.css'
})
export class MyServicesComponent implements OnInit {
  services: ServiceItem[] = [];
  loading = true;

  constructor(private businessService: BusinessService) {}

  ngOnInit() {
    this.businessService.getMyServices().subscribe({
      next: (s) => { this.services = s; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  remove(id: number) {
    this.businessService.deleteService(id).subscribe({
      next: () => this.services = this.services.filter(s => s.id !== id)
    });
  }
}
