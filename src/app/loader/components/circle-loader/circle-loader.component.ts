import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circle-loader',
  templateUrl: './circle-loader.component.html',
  styleUrls: ['./circle-loader.component.scss']
})
export class CircleLoaderComponent {

  @Input() width = 48;
  @Input() height = 48;
  @Input() set setColor(color: string) {
    this.svgFillColor = color;
  }

  @HostBinding('style.fill') svgFillColor = '#096BEF';
}
