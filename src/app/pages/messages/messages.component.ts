import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MessagingService } from '../../core/services/messaging.service';
import { AuthService } from '../../core/services/auth.service';
import { Message, User } from '../../core/models/models';

interface ConversationRow {
  otherUserId: number;
  otherUserName: string;
  lastMessage: string;
  lastSentAt: string;
}

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit {
  conversations: ConversationRow[] = [];
  loading = true;

  constructor(private messaging: MessagingService, private auth: AuthService) {}

  ngOnInit() {
    const myId = this.auth.currentUser()?.id;

    this.messaging.getConversations().subscribe({
      next: (messages) => {
        // Group by whichever side of each message ISN'T me, keeping only
        // the most recent message per person (backend already returns
        // messages newest-first, so the first one we see per person wins).
        const byOtherUser = new Map<number, Message>();
        for (const m of messages) {
          const otherId = m.senderId === myId ? m.receiverId : m.senderId;
          if (!byOtherUser.has(otherId)) {
            byOtherUser.set(otherId, m);
          }
        }

        const otherIds = Array.from(byOtherUser.keys());
        if (otherIds.length === 0) {
          this.loading = false;
          return;
        }

        let remaining = otherIds.length;
        for (const otherId of otherIds) {
          this.auth.getUserById(otherId).subscribe({
            next: (user: User) => {
              const m = byOtherUser.get(otherId)!;
              this.conversations.push({
                otherUserId: otherId,
                otherUserName: user.name,
                lastMessage: m.content,
                lastSentAt: m.sentAt
              });
              if (--remaining === 0) this.loading = false;
            },
            error: () => { if (--remaining === 0) this.loading = false; }
          });
        }
      },
      error: () => { this.loading = false; }
    });
  }

  timeLabel(iso: string): string {
    return new Date(iso).toLocaleString(undefined, {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
    });
  }
}