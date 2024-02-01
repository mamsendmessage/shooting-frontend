import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Input() totalItems = 0;
  @Input() itemsPerPage = 5;
  @Input() currentPage = 1;
  @Output() change = new EventEmitter<number>();

  onPageChange(page: number): void {
    const startIndex = (page - 1) * this.itemsPerPage;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.change.emit(this.currentPage);
    }
  }

  onChange(pValue: any) {
    if (pValue.value == "") {
      //Nothing to do
    } else {
      this.itemsPerPage = +pValue.value;
      this.change.emit(this.itemsPerPage)
    }
  }


}
