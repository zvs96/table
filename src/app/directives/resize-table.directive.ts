import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy, OnInit,
  Optional,
  Output,
  Renderer2
} from '@angular/core';
// import { TableSettingsService } from 'src/app/core/http-services/table-settings.service';
// import { TABLE_TYPE } from '../../../core/constants/table-constants';
// import { ModalsV2Service } from '../../modals-v2/modals-v2.service';
// import { CONFIRM_POPUP_RESPONSE } from '../../modals-v2/constants';
// import { ITableColumnWidth } from '../../../core/models/types/tables';
import { FlexibleTableDirective } from './flexible-table.directive';
import { min, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ITableColumnWidth, TABLE_TYPE } from "../table/table.types";

@Directive({
  selector: '[appResizeTable]'
})

export class ResizeTableDirective implements OnInit, AfterViewInit, OnDestroy {
  readonly RESIZE_CLASS = 'resizable-column-v2';
  readonly POINTER_MOVING_CLASS = 'in-move';
  readonly POINTER_CONTAINER_CLASS = 'resize-pointer-container-v2';

  readonly COLUMN_FOR_RESIZE = 'app-table-header-cell';
  readonly COLUMN_FOR_RESIZE_NAME = 'resizeKey';
  readonly COLUMN_LABEL = '.cell-label';

  readonly DEFAULT_MIN_WIDTH = 40;
  readonly COLUMN_RIGHT_PADDING = 5;

  @Output() hideColumn: EventEmitter<string> = new EventEmitter<string>();

  @Input() tab = TABLE_TYPE.order;

  downEvent: () => void;
  moveEvent: () => void;
  upEvent: () => void;

  columnsWidth: ITableColumnWidth = {};
  container: HTMLElement;

  private unsubscribe$$: Subject<void> = new Subject();

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    @Optional() private flexibleTableDirective: FlexibleTableDirective,
  ) {
  }

  ngOnInit(): void {
    if (this.flexibleTableDirective) {
      this.flexibleTableDirective.changedColumnsWidth
        .pipe(takeUntil(this.unsubscribe$$))
        .subscribe(columnsWidth => this.columnsWidth = columnsWidth);
    } else {
      console.error('FlexibleTableDirective is required for ResizeTableDirective');
    }
  }

  ngAfterViewInit(): void {
    this.createPointerContainer();
    this.initListeners();
  }

  initListeners(): void {

    this.downEvent = this.renderer.listen(this.element.nativeElement, 'mousedown', (event) => {
      const defaultColumnsSettings = this.flexibleTableDirective?.defaultColumnsSettings || {};
      if (event.target.classList.contains(this.RESIZE_CLASS)) {
        const currentTarget = event.target;
        const resizableColumnHeader = currentTarget.closest(this.COLUMN_FOR_RESIZE);
        const columnKey = this.getColumnName(resizableColumnHeader);

        if (resizableColumnHeader && columnKey) {
          const headerTitle = resizableColumnHeader.querySelector(this.COLUMN_LABEL);
          this.toggleResizeHeaderColor(headerTitle, true);

          const columnLeftIdent = resizableColumnHeader.getBoundingClientRect().left;

          const minWidth = (defaultColumnsSettings[columnKey].minWidth - this.COLUMN_RIGHT_PADDING) || this.DEFAULT_MIN_WIDTH;

          const leftPointerPosition = columnLeftIdent + this.columnsWidth[columnKey] - this.COLUMN_RIGHT_PADDING;

          const pointer = this.createPointer(leftPointerPosition);

          this.renderer.addClass(this.container, this.POINTER_MOVING_CLASS);

          this.moveEvent = this.renderer.listen(this.container, 'mousemove', (event) => {
            event.stopPropagation();
            if (event.pageX - columnLeftIdent < minWidth) {
              this.finishResize(pointer, headerTitle);
              this.chooseColumnDisplayingStatus(columnKey, defaultColumnsSettings[columnKey].minWidth);
            } else {
              this.renderer.setStyle(pointer, 'left', event.pageX + 'px');
            }
          });

          this.upEvent = this.renderer.listen(this.container, 'mouseup', (event) => {
            if (this.moveEvent) {
              event.stopPropagation();

              const pageX = parseInt(pointer.style.left);
              const newWidth = pageX - resizableColumnHeader.getBoundingClientRect().left;
              this.setColumnNewWidth(columnKey, newWidth);
              this.finishResize(pointer, headerTitle);
            }
          });
        }
      }
    });
  }

  setColumnNewWidth(columnKey: string, newWidth: number): void {
    console.error(columnKey, newWidth);
  }

  chooseColumnDisplayingStatus(columnKey: string, minWidth: number): void {
    console.error(columnKey, minWidth);
  }

  finishResize(pointer: HTMLElement, headerTitle: HTMLElement): void {
    this.renderer.removeClass(this.container, this.POINTER_MOVING_CLASS);
    this.renderer.removeChild(this.container, pointer);
    this.toggleResizeHeaderColor(headerTitle, false);

    this.removeListeners();
  }

  removeListeners(): void {
    this.moveEvent();
    this.upEvent();
  }

  createPointerContainer(): void {
    let resizeContainer = document.querySelector(`.${ this.POINTER_CONTAINER_CLASS }`);
    if (!resizeContainer) {
      resizeContainer = this.renderer.createElement('div');
      this.renderer.addClass(resizeContainer, this.POINTER_CONTAINER_CLASS);
    }
    this.container = resizeContainer as HTMLElement;

    this.renderer.appendChild(document.body, this.container);
  }

  createPointer(left: number): HTMLElement {
    const adjustmentHeight = 15;
    const adjustmentTop = 4;

    const sizes = this.element.nativeElement.getBoundingClientRect();

    const pointer = this.renderer.createElement('div');

    this.renderer.setStyle(pointer, 'height', `${ sizes.height - adjustmentHeight }px`);
    this.renderer.setStyle(pointer, 'top', `${ sizes.top + adjustmentTop }px`);
    this.renderer.setStyle(pointer, 'left', `${ left }px`);

    this.renderer.appendChild(this.container, pointer);
    return pointer;
  }

  getColumnName(header: HTMLElement): string {
    return header.getAttribute(this.COLUMN_FOR_RESIZE_NAME);
  }

  toggleResizeHeaderColor(resizedBlock: HTMLElement, setStyle: boolean): void {
    const styleName = 'background-color';
    if (setStyle) {
      this.renderer.setStyle(resizedBlock, styleName, '#37393D');
    } else {
      this.renderer.removeStyle(resizedBlock, styleName);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$$.next();
    this.unsubscribe$$.complete();

    this.downEvent && this.downEvent();
    this.upEvent && this.upEvent();
    this.moveEvent && this.moveEvent();
  }
}
