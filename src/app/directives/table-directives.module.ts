import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexibleTableDirective } from "./flexible-table.directive";
import { ResizeTableDirective } from "./resize-table.directive";
import { StickyCellDirective } from "./sticky-cell.directive";
import { VirtualViewportDirective } from "./virtual-viewport/virtual-viewport.directive";
import { VirtualViewportComponent } from "./virtual-viewport/virtual-viewport.component";

@NgModule({
  declarations: [
    VirtualViewportComponent,
    FlexibleTableDirective,
    ResizeTableDirective,
    StickyCellDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    VirtualViewportComponent,
    FlexibleTableDirective,
    ResizeTableDirective,
    StickyCellDirective,
  ]
})
export class TableDirectivesModule {
}
