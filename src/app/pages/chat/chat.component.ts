import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessagingService } from '../../core/services/messaging.service';
import { AuthService } from '../../core/services/auth.service';
import { Message, User } from '../../core/models/models';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  otherUserId!: number;
  otherUser?: User;
  messages: Message[] = [];
  draft = '';

  constructor(
    private route: ActivatedRoute,
    private messaging: MessagingService,
    private auth: AuthService,
    public authPublic: AuthService
  ) {}

  ngOnInit() {
    this.otherUserId = Number(this.route.snapshot.paramMap.get('businessId'));

    this.auth.getUserById(this.otherUserId).subscribe({
      next: (u) => this.otherUser = u,
      error: () => {}
    });

    this.messaging.getConversation(this.otherUserId).subscribe({
      next: (m) => this.messages = m,
      error: () => {}
    });
  }

  isMine(m: Message): boolean {
    return m.senderId === this.auth.currentUser()?.id;
  }

  // WhatsApp-style: only show a date divider when the day actually changes
  showDateDivider(index: number): boolean {
    if (index === 0) return true;
    const prev = new Date(this.messages[index - 1].sentAt).toDateString();
    const curr = new Date(this.messages[index].sentAt).toDateString();
    return prev !== curr;
  }

  dateLabel(iso: string): string {
    const date = new Date(iso);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
  }

  timeLabel(iso: string): string {
    return new Date(iso).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  }

  send() {
    if (!this.draft.trim()) return;
    this.messaging.send({ receiverId: this.otherUserId, content: this.draft }).subscribe({
      next: (m) => { this.messages.push(m); this.draft = ''; }
    });
  }
}