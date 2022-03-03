import { Component } from '@angular/core';
import { TableActionComponent } from '../table-action/table-action.component';

@Component({
  selector: 'app-table-action-with-sub-actions',
  templateUrl: './table-action-with-sub-actions.component.html',
  styleUrls: ['../table-action/table-action.component.scss']
})
export class TableActionWithSubActionsComponent extends TableActionComponent {

  constructor() {
    super();
  }

}
