import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { RowsSkeletonComponent } from './components/rows-skeleton/rows-skeleton.component';
import { CircleLoaderComponent } from './components/circle-loader/circle-loader.component';

@NgModule({
  declarations: [
    LoaderComponent,
    RowsSkeletonComponent,
    CircleLoaderComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    RowsSkeletonComponent,
    CircleLoaderComponent,
  ]
})
export class LoaderModule { }
