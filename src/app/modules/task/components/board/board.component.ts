import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Board, Item, ApiService } from '@core';

@Component({
  selector: 'mgr-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() board: Board;

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    /** SORT Items list */
    this.board.items.sort(this._descending);
  }

  _descending(a: Item, b: Item) {
    return b.priority - a.priority;
  }

  _ascending(a: Item, b: Item) {
    return a.priority - b.priority;
  }

}
