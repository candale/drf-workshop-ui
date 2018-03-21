import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishLast';

import { Settings } from '../../settings/settings';
import { Board } from '../../models/board.model';
import { Item } from '../../models/item.model';
import { ItemState } from '../../models/itemState.model';

@Injectable()
export class ApiService {
  taskBoards: BehaviorSubject<any> = new BehaviorSubject(null);
  currentBoard: BehaviorSubject<Board> = new BehaviorSubject(null);
  _currentBoard: Board;

  constructor(private http: HttpClient) {
    this.init();
  }

  init() {
    this.http.get(Settings.api.tasks.boards).subscribe(response => {
      const board: Board = response[0];
      this.getBoardItems(board.id).subscribe((items: Array<Item>) => {
        items.forEach(item => {
          item = new Item(item);
        });
        board.items = items;
        this._currentBoard = new Board(board);
        this.currentBoard.next(this._currentBoard);
      });
      this.taskBoards.next(response);
    });
  }

  getCurrentBoard() {
    return this.currentBoard.filter(board => board !== null);
  }

  getCurrentBoardValue() {
    return this.currentBoard.getValue();
  }

  getTaskBoards() {
    return this.taskBoards.filter(boards => boards !== null);
  }

  getBoardItems(boardId) {
    return this.http.get(`${Settings.api.tasks.items}?board=${+boardId}`);
  }

  removeItem(id) {
    const obs = this.http.delete(Settings.api.tasks.items + `${id}/`).publishLast().refCount();
    obs.subscribe(resp => {
      const index = this._currentBoard.items.findIndex(item => item.id === +id);
      this._currentBoard.items.splice(index, 1);
      this.currentBoard.next(this._currentBoard);
    });
    return obs;
  }

  addItem(payload) {
    const obs = this.http.post(Settings.api.tasks.items, payload).publishLast().refCount();
    obs.subscribe(resp => {
      this._currentBoard.items.push(new Item(payload));
      this.currentBoard.next(this._currentBoard);
    });
    return obs;
  }

  markItemAsDone(id) {
    const obs = this.http.patch(Settings.api.tasks.items + `${id}/`, {state: ItemState.DONE})
      .publishLast().refCount();
    obs.subscribe(resp => {
      const index = this._currentBoard.items.findIndex(item => item.id === +id);
      this._currentBoard.items.splice(index, 1);
      this.currentBoard.next(this._currentBoard);
    });
    return obs;
  }
}
