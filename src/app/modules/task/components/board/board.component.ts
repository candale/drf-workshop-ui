import { Component, OnInit, Input } from '@angular/core';

import { Board, Item } from '@core';

@Component({
  selector: 'mgr-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() boards: Array<Board>;

  constructor() { }

  ngOnInit() {
  }

}
