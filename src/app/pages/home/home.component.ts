import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../core/services/search.service';
import { Business } from '../../core/models/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  query = '';
  featured: Business[] = [];
  loading = true;

  // Matches the pill categories in the design — adjust to your real category names
  categories = ['Hair & Beauty', 'Food & Catering', 'Trades', 'Tutoring', 'Transport', 'Spaza'];

  constructor(private searchService: SearchService, private router: Router) {}

  ngOnInit() {
    this.searchService.search({}).subscribe({
      next: (results) => { this.featured = results.slice(0, 3); this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  goSearch(category?: string) {
    const term = category ?? this.query;
    this.router.navigate(['/search'], term ? { queryParams: { q: term } } : {});
  }
}
