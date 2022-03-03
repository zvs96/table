import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-drag-placeholder',
  templateUrl: './drag-placeholder.component.html',
  styleUrls: ['./drag-placeholder.component.scss']
})
export class DragPlaceholderComponent {
  @HostBinding('class.preview') get isPortrait(): boolean { return this.preview; }

  @Input() preview = false;
  @Input() message = 'Drop block here';
}
