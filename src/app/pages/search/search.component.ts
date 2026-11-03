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

    failed = new Set<number>();

  categoryImages: Record<string, string[]> = {
    'Hair & Beauty': ['assets/images/biz-braids.jpg', 'assets/images/biz-salon.jpeg'],
    'Food & Catering': ['assets/images/biz-braai.jpg'],
    'Tutoring': ['assets/images/biz-tutor.jpg', 'assets/images/biz-tutor2.jpeg'],
    'Trades': ['assets/images/biz-trades.jpeg'],
    'Transport': ['assets/images/biz-transport.jpeg'],
    'Spaza': ['assets/images/biz-spaza.jpeg']
  };

   imageFor(b: Business): string | null {
    if (this.failed.has(b.id)) return null;
    if (b.image) return b.image;
    const list = this.categoryImages[b.category];
    if (!list || !list.length) return null;
    const sameCategory = this.results.filter(f => f.category === b.category);
    const position = sameCategory.findIndex(f => f.id === b.id);
    return list[position % list.length];
  }

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
            next: (results) => {
        // Hide exact duplicates (same name, category and location)
        const seen = new Set<string>();
        this.results = results.filter(b => {
          const key = `${b.name}|${b.category}|${b.location}`.toLowerCase();
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }
}
