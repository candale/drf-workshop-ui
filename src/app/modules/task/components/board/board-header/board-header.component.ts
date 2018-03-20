import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss']
})
export class BoardHeaderComponent implements OnInit {
  @Input() board: any;

  constructor() { }

  ngOnInit() {
    console.log(this.board);
  }
}
