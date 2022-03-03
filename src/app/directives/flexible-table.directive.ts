import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { ITableColumnsSettings, ITableColumnWidth, ITableSetting, TABLE_TYPE, TableSetting } from "../table/table.types";

@Directive({
  selector: '[appFlexibleTable]'
})
export class FlexibleTableDirective implements AfterViewInit {

  readonly DEFAULT_MIN_WIDTH = 40;

  @Output() changedColumnsWidth: EventEmitter<ITableColumnWidth> = new EventEmitter<ITableColumnWidth>();

  @Input() set isSelectionMode(isSelectionMode: boolean) {
    if (this.isSelectionActive !== isSelectionMode) {
      this.isSelectionActive = isSelectionMode;
      this.calculateFreeColumnsWidth(this.finalColumnsWidth);
    }
  }

  @Input() defaultColumnsSettings: ITableColumnsSettings;

  @Input() set columnsSettings(columnsSettings: ITableSetting[]) {
    if (columnsSettings && columnsSettings.length) {
      this.columnsSettingsList = columnsSettings;
      this.tableWidth && this.getColumnsWidth(columnsSettings);
    }
  }

  @Input() set columnsKeys(columnsKeys: string[]) {
    if (columnsKeys && columnsKeys.length) {
      this.freeColumnsKeys = columnsKeys;
      this.tableWidth && this.calculateFreeColumnsWidth();
    }
  }

  @Input() tab = TABLE_TYPE.order;

  columnsSettingsList: ITableSetting[];
  finalColumnsWidth: ITableColumnWidth = {};
  freeColumnsKeys: string[] = [];
  tableWidth: number;
  isSelectionActive = false;

  constructor(
    private element: ElementRef,
  ) {
  }

  ngAfterViewInit(): void {
    this.tableWidth = this.element.nativeElement.getBoundingClientRect().width;
    this.columnsSettingsList ? this.getColumnsWidth(this.columnsSettingsList) : this.calculateFreeColumnsWidth();
  }

  updateColumnWidth(columnKey: string, newWidth: number): void {
    this.finalColumnsWidth[columnKey] = newWidth;
    this.freeColumnsKeys = this.freeColumnsKeys.filter(key => key !== columnKey);
    this.calculateFreeColumnsWidth(this.finalColumnsWidth);
  }

  getColumnsWidth(columnsSettings: ITableSetting[]): void {
    // get map of visible columns
    const columnsWidthMap = TableSetting.getColumnsWidthMapFromSettings(TableSetting.calculateVisibleColumns(columnsSettings));
    // list of column with not fixed width
    const freeColumns = [];

    Object.keys(columnsWidthMap).forEach((key) => {
      if (columnsWidthMap[key] && this.defaultColumnsSettings[key]) {
        // if column has fixed width but it less than minimum width, set it to minimum width
        columnsWidthMap[key] = columnsWidthMap[key] >= this.defaultColumnsSettings[key].minWidth
          ? columnsWidthMap[key]
          : this.defaultColumnsSettings[key].minWidth;
      } else {
        freeColumns.push(key);
      }
    });
    this.freeColumnsKeys = freeColumns;

    // calculate additional width of columns with not fixed width
    this.calculateFreeColumnsWidth(columnsWidthMap);
  }

  calculateFreeColumnsWidth(notChekingColumnWidthMap: ITableColumnWidth = {}): void {
    const columnWidthMap = {...notChekingColumnWidthMap};

    const tableWidth = this.isSelectionActive
      ? this.tableWidth - this.defaultColumnsSettings['select'].minWidth
      : this.tableWidth;

    let sumOfFreeColumnsPriorities = 0;
    this.freeColumnsKeys.forEach(key => {
      if (!this.defaultColumnsSettings[key]) {
        console.error(`There is no column with name: ${ key }`);
        return;
      }
      // reset columns with no fixed width to minimum width
      columnWidthMap[key] = this.defaultColumnsSettings[key].minWidth || this.DEFAULT_MIN_WIDTH;

      sumOfFreeColumnsPriorities += this.defaultColumnsSettings[key].priority;
    });

    // get full width for all columns
    const columnsWidth = Object.values(columnWidthMap).reduce((sumWidth, width) => sumWidth + width, 0);

    if (tableWidth > columnsWidth && this.freeColumnsKeys.length) {
      // get minimum minimum unit of width increasing
      const widthUnit = Math.floor((tableWidth - columnsWidth) / sumOfFreeColumnsPriorities);

      // add additional width to columns with not fixed width
      this.freeColumnsKeys.forEach((columnKey) => {
        if (!this.defaultColumnsSettings[columnKey]) {
          console.error(`There is no column with name: ${ columnKey }`);
          return;
        }
        columnWidthMap[columnKey] = columnWidthMap[columnKey] + widthUnit * this.defaultColumnsSettings[columnKey].priority;
      });
    }
    this.finalColumnsWidth = columnWidthMap;
    this.changedColumnsWidth.emit(this.finalColumnsWidth);
  }
}
