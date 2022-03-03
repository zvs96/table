import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

import { EllipsisTextComponent } from './ellipsis-text.component';

@NgModule({
  declarations: [EllipsisTextComponent],
  imports: [
    CommonModule,
    MatTooltipModule,
  ],
  exports: [EllipsisTextComponent]
})
export class ElipsisTextModule { }
