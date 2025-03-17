import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Library {
  FullName: string;
  Address?: string;
}

@Component({
  selector: 'app-library-search',
  templateUrl: './library-search.component.html',
  styleUrls: ['./library-search.component.scss']
})
export class LibrarySearchComponent {  
  searchTerm: string = '';
  libraries: Library[] = [];
  loading: boolean = false;
  error: string | null = null;
  selectedLibrary: Library | null = null;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  handleSearch(): void {
    if (!this.searchTerm.trim()) return;
  
    this.loading = true;
    this.error = null;
  
    this.http.get<any[]>('https://apidata.mos.ru/v1/datasets/526/rows?api_key=0011e578-4a8e-40f5-b87f-726d40a755c2')
      .subscribe({
        next: (data) => {
          this.libraries = data.map(item => ({
            FullName: item.Cells.FullName,
            Address: item.Cells.ObjectAddress?.[0]?.Address || 'Адрес не указан'
          })).filter(lib => 
            lib.FullName && lib.FullName.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error fetching data: ' + err.message;
          this.loading = false;
          console.error(err);
        }
      });
  }

  selectLibrary(library: Library): void {
    this.selectedLibrary = library;
  }

  closeLibraryDetails(): void {
    this.selectedLibrary = null;
  }

  trackByLibrary(index: number, library: Library): string {
    return library.FullName;
  }

  highlightSearchTerm(text: string): SafeHtml {
    if (!this.searchTerm.trim()) return text;
    
    const regex = new RegExp(`(${this.searchTerm})`, 'gi');
    const highlighted = text.replace(regex, `<span style="background-color: lightblue; border-radius: 3px;">$1</span>`);
    return this.sanitizer.bypassSecurityTrustHtml(highlighted);
  }
}