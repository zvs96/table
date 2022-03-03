import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableCellComponent {

  @Input() width = 100;
  @Input() isSticky = false;
  @Input() paddings = true;
  @Input() type: 'grow' | 'default' = 'default';
  @Input() growValue = 1;

  @HostBinding('class.grow') get grow(): boolean {
    return this.type === 'grow';
  }

  @HostBinding('style.flexGrow') get defineGrowValue(): number {
    return this.type === 'grow' ? this.growValue : 0;
  }

}
