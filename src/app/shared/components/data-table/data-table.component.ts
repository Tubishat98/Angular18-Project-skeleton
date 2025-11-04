import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Data table component
 * Reusable data table with sorting and pagination
 * TODO: Implement full data table functionality
 */
@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <table class="data-table">
      <thead>
        <tr>
          <th *ngFor="let column of columns">{{ column }}</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of data">
          <td *ngFor="let column of columns">{{ row[column] }}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [`
    .data-table {
      width: 100%;
      border-collapse: collapse;
    }
    .data-table th,
    .data-table td {
      padding: 10px;
      border: 1px solid #ddd;
      text-align: left;
    }
    .data-table th {
      background: #f5f5f5;
      font-weight: bold;
    }
  `]
})
export class DataTableComponent {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
}

