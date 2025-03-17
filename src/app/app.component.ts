import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedLibrary: any = null;

  onLibrarySelected(library: any) {
    this.selectedLibrary = library;
  }
}