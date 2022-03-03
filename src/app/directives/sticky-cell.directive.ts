import { Directive, ElementRef, Renderer2, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appStickyCell]'
})
export class StickyCellDirective implements OnInit, OnDestroy{
  constructor(
    private _renderer: Renderer2,
    private elem: ElementRef,
  ) {}

  @Input() direction: 'left' | 'right' = 'left';

  ngOnInit(): void {
    this._renderer.setStyle(this.elem.nativeElement, 'position', 'sticky');
    this._renderer.addClass(this.elem.nativeElement, 'sticky-cell');

    if (this.direction === 'left') {
      this._renderer.setStyle(this.elem.nativeElement, 'order', '-1');
    } else {
      this._renderer.setStyle(this.elem.nativeElement, 'order', '999');
      this._renderer.setStyle(this.elem.nativeElement, 'margin-left', 'auto');
    }
    this._renderer.setStyle(this.elem.nativeElement, this.direction, '0');
  }

  ngOnDestroy(): void {
    this._renderer.removeClass(this.elem.nativeElement, 'sticky-cell');
  }
}
