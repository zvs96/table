import { Component } from '@angular/core';
import { TableCellComponent } from '../table-cell/table-cell.component';

@Component({
  selector: 'app-table-header-action-cell',
  templateUrl: './table-header-action-cell.component.html',
  styleUrls: ['./table-header-action-cell.component.scss']
})
export class TableHeaderActionCellComponent extends TableCellComponent {

  constructor() {
    super();
  }
}
