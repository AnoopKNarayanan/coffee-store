import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() currPage: number = 1;
  @Input() size: number = 50;
  @Input() limit: number = 10;
  @Output() changePage = new EventEmitter<number>();

  pages: number[] = [];
  count: number = 1;
  prevDisabled: boolean = true;
  nextDisabled: boolean = true;

  ngOnInit(): void {
    this.count = Math.ceil(this.size / this.limit);
    this.count > 1 ? this.nextDisabled = false : this.nextDisabled = true;
    this.pages = this.getPageNos(); 
    this.checkPrevNext();   
  }

  /**
   * To enable/disable Prev/Next buttons on the view, based on active page
   * @param changes SimpleChanges object
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.checkPrevNext();
  }

  /**
   * Function to calculate total number of pages
   * @returns Number of pages
   */
  getPageNos(): number[] {
    return [...Array(this.count).keys()].map((el) => el + 1);
  }

  /**
   * Function triggered when previous page is requested
   */
  prevPage() {
    (this.currPage > 1 && this.currPage <= this.count) ? this.changePage.emit(this.currPage - 1) : this.prevDisabled = true;
  }

  /**
   * Function triggered when next page is requested
   */
  nextPage() {
    (this.currPage > 0 && this.currPage < this.count) ? this.changePage.emit(this.currPage + 1) : this.nextDisabled = true;
  }

  checkPrevNext() {
    this.currPage == 1 ? this.prevDisabled = true : this.prevDisabled = false;
    this.currPage == this.count ? this.nextDisabled = true : this.nextDisabled = false;
  }
}