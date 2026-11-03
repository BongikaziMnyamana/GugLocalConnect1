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
  failed = new Set<number>();

  // Matches the pill categories in the design — adjust to your real category names
  categories = ['Hair & Beauty', 'Food & Catering', 'Trades', 'Tutoring', 'Transport', 'Spaza'];

  // IMPORTANT: copy these file names from the categoryImages list in search.component.ts
  categoryImages: Record<string, string[]> = {
    'Hair & Beauty': ['assets/images/biz-braids.jpg', 'assets/images/biz-salon.jpeg'],
    'Food & Catering': ['assets/images/biz-braai.jpg'],
    'Tutoring': ['assets/images/biz-tutor.jpg', 'assets/images/biz-tutor2.jpeg'],
    'Trades': ['assets/images/biz-trades.jpeg'],
    'Transport': ['assets/images/biz-transport.jpeg'],
    'Spaza': ['assets/images/biz-spaza.jpeg']
  };

  constructor(private searchService: SearchService, private router: Router) {}

  ngOnInit() {
    this.searchService.search({}).subscribe({
      next: (results) => { this.featured = results.slice(0, 3); this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  imageFor(b: Business): string | null {
    if (this.failed.has(b.id)) return null;
    if (b.image) return b.image;
    const list = this.categoryImages[b.category];
    if (!list || !list.length) return null;
    const sameCategory = this.featured.filter(f => f.category === b.category);
    const position = sameCategory.findIndex(f => f.id === b.id);
    return list[position % list.length];
  }

  goSearch(category?: string) {
    const term = category ?? this.query;
    this.router.navigate(['/search'], term ? { queryParams: { q: term } } : {});
  }
}