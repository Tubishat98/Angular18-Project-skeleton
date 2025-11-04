import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Error message component
 * Displays error messages to users
 */
@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="error-message" *ngIf="message">
      <p>{{ message }}</p>
    </div>
  `,
  styles: [`
    .error-message {
      background: #fee;
      border: 1px solid #fcc;
      color: #c33;
      padding: 10px;
      border-radius: 4px;
      margin: 10px 0;
    }
  `]
})
export class ErrorMessageComponent {
  @Input() message: string | null = null;
}

