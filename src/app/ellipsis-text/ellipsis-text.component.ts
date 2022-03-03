import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-ellipsis-text',
  templateUrl: './ellipsis-text.component.html',
  styleUrls: ['./ellipsis-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EllipsisTextComponent {

  @Input() tooltipText: string|number = '';
  @Input() tooltipDisabled = false;
}
