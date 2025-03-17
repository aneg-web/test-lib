import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LibrarySearchComponent } from './library-search/library-search.component';
import { LibraryDetailComponent } from './library-detail/library-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LibrarySearchComponent,
    LibraryDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }