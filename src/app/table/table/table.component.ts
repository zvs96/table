import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

import {
  DEFAULT_LIMIT,
  ISort, ITablePagination, DefaultPaginationStrategy,
  PaginationStrategiesNames,
  PaginationStrategy,
  WeakPaginationStrategy, ITableLoaderConfig, TableDragEvent
} from '../table.types';
import { TableRowComponent } from "../table-row/table-row.component";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges, OnDestroy {


  @ViewChild('tableContainer', {static: true}) tableContainer: ElementRef;
  @ContentChild('tableBody', {static: false}) tableBody: TemplateRef<any>;
  @ContentChild('tableHeader', {static: false}) tableHeader: TemplateRef<any>;
  @ContentChild('staticTableRow', {static: false}) staticTableRow: TemplateRef<any>;

  @ViewChildren(TableRowComponent) rows: TableRowComponent[];

  @ViewChild(CdkVirtualScrollViewport, {static: false}) virtualViewport: CdkVirtualScrollViewport;

  @HostBinding('attr.style') style: SafeStyle;

  @Input() set data(data: any[]) {
    this.dataList = data;
    if (this.dataList.length && this.scrolledDistance) {
      setTimeout(() => {
        if (this.virtualViewport && this.isVirtual) {
          this.virtualViewport.scrollTo({top: this.scrolledDistance});
        } else {
          this.tableContainer.nativeElement.scrollTop = this.scrolledDistance;
        }
      });
    }
  }

  @Input() isVirtual = false;

  @Input() set sort(sort: ISort) {
    if (sort) {
      this.sortUpdate.next(sort);
    }
  }

  @Input() entityKey = 'id';
  @Input() customMessage: string;
  @Input() isSelectionMode = false;
  @Input() isAllSelected = false;
  @Input() selectedItems: { [key: string]: any } = {};
  @Input() disabledSelectionItems: number[] = [];

  @Input() skeletonConfig: Partial<ITableLoaderConfig> = null;
  @Input() isLoading = false;

  @Input() scrolledDistance = 0;
  @Input() pagination: ITablePagination;

  @Input('paginationStrategy') set setStrategy(strategyName: PaginationStrategiesNames) {
    this.strategyName = strategyName;
    this.paginationStrategy = strategyName === PaginationStrategiesNames.default
      ? new DefaultPaginationStrategy()
      : new WeakPaginationStrategy();
  }

  @Input() hiddenEntities = 0;
  @Input() limit = DEFAULT_LIMIT;
  @Input() scrollOffset = 2; // 20 percentage
  @Input() disableEmptyMessage = false;
  @Input() draggable = false;

  @Output() sortChanged: EventEmitter<ISort> = new EventEmitter<ISort>();

  @Output() selected: EventEmitter<any> = new EventEmitter<any>();
  @Output() allSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() infinityScrollEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() scrollEvent: EventEmitter<number> = new EventEmitter<number>();

  @Output() dropped: EventEmitter<TableDragEvent> = new EventEmitter<TableDragEvent>();

  dataList: any[] = [];
  loadersArray = [];
  loadersConfig: ITableLoaderConfig = {
    // Base width for orders table cells. In future can be configured from table collumns config.
    rowsConfig: [50, 70, 120, 120, 100, 90, 150, 150, 130, 85, 85, 100, 130, 130, 130, 110, 80, 85, 100, 90, 110, 80, 100],
    smallAmount: 2,
    defaultAmount: 10,
    responsive: false,
  };
  sortUpdate: BehaviorSubject<ISort> = new BehaviorSubject<ISort>(null);
  private scrollTable$$: Subject<number> = new Subject();
  private unsubscribe$$: Subject<void> = new Subject();
  private paginationStrategy: PaginationStrategy = new DefaultPaginationStrategy();
  private strategyName = PaginationStrategiesNames.default;

  constructor(
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.style = this.sanitizer.bypassSecurityTrustStyle(`--offset-top: ${ this.staticTableRow ? 82 : 32 }px`);

    this.scrollTable$$
      .pipe(
        debounceTime(500),
        takeUntil(this.unsubscribe$$),
      )
      .subscribe((scroll: number) => {
        this.scrollEvent.emit(scroll);
      });

    this.loadersArray = new Array(this.loadersConfig.defaultAmount);
  }

  ngOnChanges(): void {
    this.loadersConfig = {...this.loadersConfig, ...this.skeletonConfig};

    this.loadersArray = this.isLoading && this.dataList.length
      ? new Array(this.loadersConfig.smallAmount)
      : new Array(this.loadersConfig.defaultAmount);
  }

  toggleSelect(item: any): void {
    this.selected.emit(item[this.entityKey]);
  }

  selectAll(selectAll: boolean): void {
    this.allSelected.emit(selectAll);
    this.rows.forEach(row => (row.isSelected = selectAll));
  }

  trackByFn(index: number, item: any): number {
    return item[this.entityKey];
  }

  onInfinityScroll(): void {

    const newOffset = this.paginationStrategy.paginate(this.pagination, this.limit);

    if (newOffset !== null) {
      this.infinityScrollEvent.emit(newOffset);
    }
  }

  onSimpleScroll(event: Event): void {
    const el: HTMLElement = event.target as HTMLElement;
    this.scrollTable$$.next(el.scrollTop);
  }

  onVirtualScroll(): void {
    if (this.pagination) {
      const end = this.virtualViewport.getRenderedRange().end;
      const total = this.virtualViewport.getDataLength();

      if (
        this.strategyName === PaginationStrategiesNames.default
        && this.pagination.total === total + this.hiddenEntities
      ) {
        return;
      }
      if (!this.isLoading && total !== 0 && end === total) {
        this.onInfinityScroll();
      }
    }
  }

  onDrop(event: CdkDragDrop<any[]>): void {
    this.dropped.emit({previousIndex: event.previousIndex, currentIndex: event.currentIndex});
  }

  ngOnDestroy(): void {
    this.unsubscribe$$.next();
    this.unsubscribe$$.complete();
  }
}
