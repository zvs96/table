import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from "./table/table.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { TableDirectivesModule } from "../directives/table-directives.module";
import { TableHeaderRowComponent } from "./table-header-row/table-header-row.component";
import { TableRowComponent } from "./table-row/table-row.component";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { DragAndDropModule } from "../drag-and-drop/drag-and-drop.module";
import { TableCellComponent } from './table-cell/table-cell.component';
import { TableHeaderCellComponent } from "./table-header-cell/table-header-cell.component";
import { VirtualViewportDirective } from "../directives/virtual-viewport/virtual-viewport.directive";
import { TableActionsComponent } from './table-actions/table-actions.component';
import { TableActionWithSubActionsComponent } from './table-actions/table-action-with-sub-actions/table-action-with-sub-actions.component';
import { TableActionComponent } from './table-actions/table-action/table-action.component';
import { MatTooltipModule } from "@angular/material/tooltip";
import { LoaderModule } from "../loader/loader.module";
import { TableHeaderActionCellComponent } from "./table-header-action-cell/table-header-action-cell.component";

@NgModule({
  declarations: [
    TableComponent,
    TableRowComponent,
    TableCellComponent,
    TableHeaderCellComponent,
    TableHeaderRowComponent,
    VirtualViewportDirective,
    TableActionsComponent,
    TableActionWithSubActionsComponent,
    TableActionComponent,
    TableHeaderActionCellComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    TableDirectivesModule,
    ScrollingModule,
    InfiniteScrollModule,
    DragAndDropModule,
    MatTooltipModule,
    LoaderModule,
  ],
  exports: [TableComponent, TableHeaderCellComponent, TableCellComponent, TableActionsComponent, TableActionComponent, TableHeaderActionCellComponent]
})
export class TableModule {
}
