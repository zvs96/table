import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-drag-handle',
  templateUrl: './drag-handle.component.html',
  styleUrls: ['./drag-handle.component.scss']
})
export class DragHandleComponent {
  readonly DRAG_ICON = 'ICONS.actionsV2.dragHandle';

  @Input() tooltip = 'Block reordering';
}
