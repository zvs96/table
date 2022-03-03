import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableRowComponent {
  readonly ICON_CHECK = 'ICONS.checkIcon';

  @Input() selectionDisabled = false;
  @Input() selectionMode = false;
  @Input() isSelected = false;
  @Output() selected: EventEmitter<null> = new EventEmitter<null>();

  constructor() {
  }

  toggleSelection(): void {
    if (this.selectionMode && !this.selectionDisabled) {
      this.isSelected = !this.isSelected;
      this.selected.emit();
    }
  }

}
