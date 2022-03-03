import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-action',
  templateUrl: './table-action.component.html',
  styleUrls: ['./table-action.component.scss']
})
export class TableActionComponent {

  @Input() icon: string = null;
  @Input() invertedIcon = false;
  @Input() isLoading = false;
  @Input() disabled = false;
  @Input() tooltipText: string = null;
  @Output() action: EventEmitter<null> = new EventEmitter();

  onClick(): void {
    if (!this.disabled && !this.isLoading) {
      this.action.emit();
    }
  }
}
