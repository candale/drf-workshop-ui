import { Component, OnInit } from '@angular/core';

import { ApiService, Board } from '@core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  board: any = null;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getMainBoard().subscribe((board) => {
      console.log(board);
      this.board = board;
    });
  }
}
