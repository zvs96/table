import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TableCellComponent } from "../table-cell/table-cell.component";
import { ISort } from "../table.types";

@Component({
  selector: 'app-table-header-cell',
  templateUrl: './table-header-cell.component.html',
  styleUrls: ['./table-header-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeaderCellComponent extends TableCellComponent implements OnInit, OnDestroy {
  readonly SORTING_ICON = 'ICONS.sortingTriangle';

  @Input() sortKey: string;
  @Input() resizeKey: string;
  @Input() reversSort = false;

  private unsubscribe$$: Subject<void> = new Subject();

  currentDirection: 'asc' | 'desc' | '' = '';
  isSortFieldActive: boolean;

  constructor(
    private tableComponent: TableComponent,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.tableComponent.sortUpdate
      .pipe(takeUntil(this.unsubscribe$$))
      .subscribe((sort: ISort) => {
        this.updateSortingStatus(sort);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$$.next();
    this.unsubscribe$$.complete();
  }

  onClick(): void {
    this.sortKey && this.emitSorting();
  }

  emitSorting(): void {
    if (this.isSortFieldActive && this.currentDirection) {
      if (this.currentDirection === 'asc') {
        this.tableComponent.sortChanged.emit({ sortField: this.sortKey, direction: this.reversSort ? '' : 'desc' });
        return;
      }
      if (this.currentDirection === 'desc') {
        this.tableComponent.sortChanged.emit({ sortField: this.sortKey, direction: this.reversSort ? 'asc' : '' });
      }
    } else {
      this.tableComponent.sortChanged.emit({ sortField: this.sortKey, direction: this.reversSort ? 'desc' : 'asc' });
    }
  }

  updateSortingStatus(sort: ISort): void {
    if (this.sortKey && sort) {
      this.isSortFieldActive = sort.sortField === this.sortKey;
      this.currentDirection = this.isSortFieldActive ? sort.direction : '';
      this.cdr.markForCheck();
    }
  }
}
