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
  @Output() currentPageChanges = new EventEmitter<number>();
  onPageChange(page: number): void {
    const startIndex = (page - 1) * this.itemsPerPage;
    this.currentPageChanges.emit(startIndex);
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
      this.onPageChange(page);
    }
  }

  nextPage() {
    const tPage: number = this.currentPage + 1;
    this.onPageChange(this.totalPages < tPage ? this.totalPages : tPage)
    this.currentPage = this.totalPages < tPage ? this.totalPages : tPage;
  }

  lastPage() {
    this.onPageChange(this.totalPages);
    this.currentPage = this.totalPages;
  }

  firstPage() {
    this.onPageChange(1);
    this.currentPage = 1;
  }

  previousPage() {
    const tPage: number = this.currentPage - 1;
    this.onPageChange(tPage > 0 ? tPage : 1);
    this.currentPage = tPage > 0 ? tPage : 1;
  }

  onItemPerPageChange(pValue: any) {
    if (pValue.value == "") {
      // Nothing to do
    } else {
      this.itemsPerPage = +pValue.value;
      this.change.emit(pValue.value);
    }
  }


}
