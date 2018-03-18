import { Component, OnInit } from '@angular/core';

import { ApiService, Board } from '@core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  boards: Array<Board>;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getTaskBoards().subscribe(boards => {
      this.boards = boards;
    });
  }
}
