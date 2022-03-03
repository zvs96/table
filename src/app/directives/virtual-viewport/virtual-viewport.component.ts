import { Component, ElementRef, ChangeDetectorRef, NgZone, Optional, Inject } from '@angular/core';
import {
  CdkVirtualScrollViewport,
  VIRTUAL_SCROLL_STRATEGY,
  VirtualScrollStrategy,
  ScrollDispatcher,
  ViewportRuler
} from '@angular/cdk/scrolling';
import { Directionality } from '@angular/cdk/bidi';

@Component({
  selector: 'app-virtual-viewport',
  templateUrl: './virtual-viewport.component.html',
  styleUrls: ['./virtual-viewport.component.scss'],
  providers: [
    {
      provide: CdkVirtualScrollViewport,
      useExisting: VirtualViewportComponent,
    }
  ]
})
export class VirtualViewportComponent extends CdkVirtualScrollViewport {
  constructor(
    public override elementRef: ElementRef<HTMLElement>,
    private changeDetectorRef: ChangeDetectorRef,
    ngZone: NgZone,
    @Optional() @Inject(VIRTUAL_SCROLL_STRATEGY) private scrollStrategy: VirtualScrollStrategy,
    @Optional() dir: Directionality,
    scrollDispatcher: ScrollDispatcher,
    viewportRuler: ViewportRuler,
  ) {
    super(
      elementRef,
      changeDetectorRef,
      ngZone,
      scrollStrategy,
      dir,
      scrollDispatcher,
      viewportRuler
    );
  }
}
