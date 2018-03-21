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
  items: Array<Item>;

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    console.log(this.board);
    this.api.getBoardItems(this.board.id).subscribe((items: Array<Item>) => {
      this.items = items;
    });
  }

}
