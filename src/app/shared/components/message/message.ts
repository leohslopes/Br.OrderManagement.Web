import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { Message } from '../../models/message';
import { MessageService } from '../../services/message-service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.html',
  styleUrl: './message.css'
})
export class MessageComponent {

  readonly messageService = inject(MessageService);

  close(id: number): void {
    this.messageService.remove(id);
  }

  alertClass(message: Message): string {
    switch (message.type) {
      case 'success':
        return 'alert-success';

      case 'warning':
        return 'alert-warning';

      case 'error':
        return 'alert-danger';

      default:
        return 'alert-info';
    }
  }

  iconClass(message: Message): string {
    switch (message.type) {
      case 'success':
        return 'bi-check-circle-fill';

      case 'warning':
        return 'bi-exclamation-triangle-fill';

      case 'error':
        return 'bi-x-circle-fill';

      default:
        return 'bi-info-circle-fill';
    }
  }
}