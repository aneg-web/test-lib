import { Component, Input, Output, EventEmitter } from '@angular/core';

interface Library {
  FullName: string;
  Address?: string;
}

@Component({
  selector: 'app-library-detail',
  templateUrl: './library-detail.component.html',
  styleUrls: ['./library-detail.component.scss']
})
export class LibraryDetailComponent {
  @Input() library: Library | null = null;
  @Output() close = new EventEmitter<void>();

  closeDetails(): void {
    this.close.emit();
  }
}