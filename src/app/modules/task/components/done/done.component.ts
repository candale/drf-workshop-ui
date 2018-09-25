import { Component, OnInit } from '@angular/core';
import { ApiService, Item, util } from '@core';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss']
})
export class DoneComponent implements OnInit {
  doneTasks: Array<Item> = [];
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getDoneTasks().subscribe(tasks => {
      this.doneTasks = tasks;
    });
  }

  getColor(id) {
    return util.getPriorityColor(id);
  }
}
