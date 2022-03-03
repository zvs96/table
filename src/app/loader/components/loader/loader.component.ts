import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  host: { 'class': 'loader' }
})
export class LoaderComponent {

  @Input() size = 50;
  @Input() set setColor(color: string) {
    this.svgFillColor = color;
  }

  @HostBinding('style.fill') svgFillColor = '#fff';
}
