import { Directive, forwardRef } from '@angular/core';
import { CdkFixedSizeVirtualScroll, VIRTUAL_SCROLL_STRATEGY, _fixedSizeVirtualScrollStrategyFactory } from '@angular/cdk/scrolling';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'app-virtual-viewport[itemSize]',
  providers: [{
    provide: VIRTUAL_SCROLL_STRATEGY,
    useFactory: _fixedSizeVirtualScrollStrategyFactory,
    deps: [forwardRef(() => VirtualViewportDirective)],
  }]
})
export class VirtualViewportDirective extends CdkFixedSizeVirtualScroll {

  constructor() {
    super();
  }

}
