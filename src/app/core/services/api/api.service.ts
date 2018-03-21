import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/filter';

import { Settings } from '../../settings/settings';

@Injectable()
export class ApiService {
  taskBoards: BehaviorSubject<any> = new BehaviorSubject(null);

  mainBoard: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    this.init();
  }

  init() {
    this.http.get(Settings.api.tasks.boards).subscribe(response => {
      this.mainBoard.next(response[0]);
      this.taskBoards.next(response);
    });
  }

  getMainBoard() {
    return this.mainBoard.filter(board => board !== null);
  }

  getTaskBoards() {
    return this.taskBoards.filter(boards => boards !== null);
  }

  getBoardItems(boardId) {
    return this.http.get(`${Settings.api.tasks.items}?board=${+boardId}`);
  }

  removeItem(id) {
    return this.http.delete(Settings.api.tasks.items + `${id}/`);
  }

}
