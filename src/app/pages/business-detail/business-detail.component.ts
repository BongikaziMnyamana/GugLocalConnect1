import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BusinessService } from '../../core/services/business.service';
import { ReviewService } from '../../core/services/review.service';
import { Business, Review } from '../../core/models/models';

@Component({
  selector: 'app-business-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './business-detail.component.html',
  styleUrl: './business-detail.component.css'
})
export class BusinessDetailComponent implements OnInit {
  business?: Business;
  reviews: Review[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private businessService: BusinessService,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.businessService.getById(id).subscribe({
      next: (b) => { this.business = b; this.loading = false; },
      error: () => { this.loading = false; }
    });
    this.reviewService.getForBusiness(id).subscribe({
      next: (r) => this.reviews = r,
      error: () => {}
    });
  }
}
