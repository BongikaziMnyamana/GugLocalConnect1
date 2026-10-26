import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

// Paste your own Formspree URL here
const FORMSPREE_URL = 'https://formspree.io/f/xppppywv';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });
  sending = false;
  success = false;
  errorMessage = '';

  constructor(private fb: FormBuilder) {}

  // fetch is used instead of HttpClient so the login token is never sent to a third party
  async submit() {
    if (this.form.invalid) return;
    this.sending = true;
    this.errorMessage = '';
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(this.form.getRawValue())
      });
      if (res.ok) {
        this.success = true;
        this.form.reset();
      } else {
        this.errorMessage = 'Something went wrong. Please try again.';
      }
    } catch {
      this.errorMessage = 'Could not send your message. Check your connection and try again.';
    } finally {
      this.sending = false;
    }
  }
}