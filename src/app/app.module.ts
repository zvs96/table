import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from "./table/table.module";
import { ElipsisTextModule } from "./ellipsis-text/elipsis-text.module";
import { TableDirectivesModule } from "./directives/table-directives.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    ElipsisTextModule,
    TableDirectivesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
