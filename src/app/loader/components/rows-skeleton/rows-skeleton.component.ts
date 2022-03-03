import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rows-skeleton',
  templateUrl: './rows-skeleton.component.html',
  styleUrls: ['./rows-skeleton.component.scss']
})
export class RowsSkeletonComponent {
  @Input() config: number[];
  @Input() isResponsive = false;
}
