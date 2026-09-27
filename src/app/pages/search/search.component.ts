import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { SearchService } from '../../core/services/search.service';
import { BusinessService } from '../../core/services/business.service';
import { Business, Category } from '../../core/models/models';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  q = '';
  category = '';
  categories: Category[] = [];
  results: Business[] = [];
  loading = true;

  constructor(
    private searchService: SearchService,
    private businessService: BusinessService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.q = this.route.snapshot.queryParamMap.get('q') || '';
    this.businessService.getCategories().subscribe({
      next: (cats) => this.categories = cats,
      error: () => {}
    });
    this.runSearch();
  }

  runSearch() {
    this.loading = true;
    this.searchService.search({ q: this.q, category: this.category }).subscribe({
      next: (results) => { this.results = results; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }
}
