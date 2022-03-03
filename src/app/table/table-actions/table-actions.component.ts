import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss']
})
export class TableActionsComponent {

  readonly ACTIONS_MENU_ICON = 'ICONS.actionsV2.dotsMenu';

  @Input() disabled = false;

  isOpen = false;

  onOpen(): void {
    this.isOpen = true;
  }

  onClose(): void {
    this.isOpen = false;
  }
}
