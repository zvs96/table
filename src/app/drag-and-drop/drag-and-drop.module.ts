import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragPlaceholderComponent } from './components/drag-placeholder/drag-placeholder.component';
import { DragHandleComponent } from './components/drag-handle/drag-handle.component';
import { DraggableBlockComponent } from './components/draggable-block/draggable-block.component';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    DragPlaceholderComponent,
    DragHandleComponent,
    DraggableBlockComponent,
  ],
  exports: [
    DragPlaceholderComponent,
    DragHandleComponent,
    DraggableBlockComponent
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
  ]
})
export class DragAndDropModule { }
