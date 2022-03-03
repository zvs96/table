import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-header-row',
  templateUrl: './table-header-row.component.html',
  styleUrls: ['./table-header-row.component.scss']
})
export class TableHeaderRowComponent {

  readonly ICON_CHECK = 'ICONS.checkIcon';
  @Input() selectionMode = false;
  @Input() isSelected = false;

  @Output() allSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  select(): void {
    this.isSelected = !this.isSelected;
    this.allSelected.emit(this.isSelected);
  }
}
