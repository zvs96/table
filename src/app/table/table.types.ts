export const DEFAULT_LIMIT = 30;

export interface ISort {
  sortField?: string;
  direction?: '' | 'asc' | 'desc';
  active?: boolean;
}

export interface ITablePagination {
  offset?: number;
  total?: number;
  page?: number;
  lastChunkSize?: number;
}

export enum PaginationStrategiesNames {
  default = 'default',
  weak = 'weak'
}

export interface ITableLoaderConfig {
  rowsConfig: number[];
  smallAmount: number;
  defaultAmount: number;
  responsive: boolean;
}

export interface TableDragEvent {
  previousIndex: number;
  currentIndex: number;
}

export interface PaginationStrategy {
  paginate(pagination: ITablePagination, limit: number): number | null;
}

export interface ITableColumnWidth {
  [key: string]: number;
}

export interface ITableColumnsSettings {
  [key: string]: { minWidth: number, priority: number };
}

export interface ITableSetting {
  id?: number;
  title: string;
  key: string;
  value: boolean;
  orderIndex: number;
  userId?: number;
  tableId?: number;
  readOnly: boolean;
  width?: number;
  onlyFE?: boolean;
  hidden?: boolean;
}

export enum TABLE_TYPE {
  order = 'orders',
}

export class DefaultPaginationStrategy implements PaginationStrategy {
  paginate(pagination: ITablePagination, limit: number): number | null {
    if (
      pagination
      && pagination.total > pagination.offset
      && pagination.total > pagination.offset + limit
    ) {
      return pagination.offset + limit;
    }

    return null;
  }
}

export class WeakPaginationStrategy implements PaginationStrategy {
  paginate(pagination: ITablePagination, limit: number): number | null {
    if (pagination && pagination.lastChunkSize >= limit) {
      return pagination.offset + limit;
    }

    return null;
  }
}



export class TableSetting {
  static calculateVisibleColumns(settings:  ITableSetting[]): ITableSetting[] {
    return settings.filter(setting => setting.value);
  }

  static getDisplayedColumnsMapFromSettings(settings:  ITableSetting[]): {[key: string]: string | number} {
    const displayedColumnsMap = {};
    settings.forEach((setting, index) => {
      if (setting.value) {
        displayedColumnsMap[setting.key] = index + 1;
      }
    });
    return displayedColumnsMap;
  }

  static getDisplayedColumnsMap(columns:  string[]): {[key: string]: string | number} {
    const displayedColumnsMap = {};
    columns.forEach((setting, index) => {
      displayedColumnsMap[setting] = index + 1;
    });
    return displayedColumnsMap;
  }

  static getColumnsWidthMap(columns:  string[]): ITableColumnWidth {
    const columnsWidth = {};
    columns.forEach(column => {
      columnsWidth[column] = null;
    });
    return columnsWidth;
  }

  static getColumnsWidthMapFromSettings(tableSettings: ITableSetting[]): ITableColumnWidth {
    const columnsWidth = {};
    tableSettings.forEach(item => { columnsWidth[item.key] = item.width; });
    return columnsWidth;
  }

  static excludeColumns(tableSettings: ITableSetting[], columnsForExclude: string[]): ITableSetting[] {
    return tableSettings.filter(el => !columnsForExclude.includes(el.key));
  }
}
