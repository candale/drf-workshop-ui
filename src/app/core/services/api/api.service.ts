
import {filter, publishLast, refCount} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

import { Settings } from '../../settings/settings';
import { Board } from '../../models/board.model';
import { Item } from '../../models/item.model';
import { ItemState } from '../../models/itemState.model';
import { util } from '../../utils/util';

@Injectable()
export class ApiService {
  taskBoards: BehaviorSubject<any> = new BehaviorSubject(null);
  _taskBoards: Array<Board> = [];
  currentBoard: BehaviorSubject<Board> = new BehaviorSubject(null);
  _currentBoard: Board;

  constructor(private http: HttpClient) {
    this.init();
  }

  init() {
    this.http.get(Settings.api.tasks.boards).subscribe((response: Array<Board>) => {
      this.taskBoards.next(response);
      if (!response.length) {
        console.log('0 boards');
        return;
      }
      this._taskBoards = response;
      this._newBoard(response[0]);
    });
  }

  getCurrentBoard() {
    return this.currentBoard.pipe(filter(board => board !== null));
  }

  getCurrentBoardValue() {
    return this.currentBoard.getValue();
  }

  getPreviousBoard() {
    const response = new BehaviorSubject(null);
    const index = this._taskBoards.findIndex(item => item.id === this._currentBoard.id);
    if (index !== 0) {
      this._newBoard(this._taskBoards[index - 1]);
      this.currentBoard.subscribe(s => {
        response.next(true);
      });
    } else {
      response.next(false);
    }
    return response.pipe(filter(item => item !== null));
  }

  getNextBoard() {
    const response = new BehaviorSubject(null);
    const index = this._taskBoards.findIndex(item => item.id === this._currentBoard.id);
    if (index < this._taskBoards.length - 1) {
      this._newBoard(this._taskBoards[index + 1]);
      this.currentBoard.subscribe(s => {
        response.next(true);
      });
    } else {
      response.next(false);
    }
    return response.pipe(filter(item => item !== null));
  }

  /** TODO:  */
  getTaskBoards() {
    return this.taskBoards.pipe(filter(boards => boards !== null));
  }

  getBoardItems(boardId) {
    return this.http.get(`${Settings.api.tasks.items}?board=${+boardId}`);
  }

  private _newBoard(board: Board) {
    this.getBoardItems(board.id).subscribe((items: Array<Item>) => {
      items.forEach(item => {
        item = new Item(item);
      });
      board.items = items;
      this._currentBoard = new Board(board);
      this.currentBoard.next(this._currentBoard);
    });
  }

  /** Item functions */

  getItem(id) {
    return this._currentBoard.items.find(item => item.id === +id);
  }

  removeItem(id) {
    const obs = this.http.delete(Settings.api.tasks.items + `${id}/`).pipe(publishLast(),refCount(),);
    obs.subscribe(resp => {
      const index = this._currentBoard.items.findIndex(item => item.id === +id);
      this._currentBoard.items.splice(index, 1);
      this.currentBoard.next(this._currentBoard);
    });
    return obs;
  }

  addItem(payload) {
    if (payload.due_date) {
      payload.due_date = util.parseDate(payload.due_date);
    }
    const obs = this.http.post(Settings.api.tasks.items, payload).pipe(publishLast(),refCount(),);
    obs.subscribe(resp => {
      this._currentBoard.items.push(new Item(resp));
      this.currentBoard.next(this._currentBoard);
    });
    return obs;
  }

  editItem(payload, id) {
    if (payload.due_date) {
      payload.due_date = util.parseDate(payload.due_date);
    }
    const obs = this.http.patch(`${Settings.api.tasks.items}${+id}/`, payload).pipe(publishLast(),refCount(),);
    obs.subscribe(resp => {
      const index = this._currentBoard.items.findIndex(item => item.id === +id);
      this._currentBoard.items[index] = new Item(resp);
      this.currentBoard.next(this._currentBoard);
    });
    return obs;
  }

  markItemAsDone(id) {
    const obs = this.http.patch(Settings.api.tasks.items + `${id}/`, {state: ItemState.DONE}).pipe(
      publishLast(),refCount(),);
    obs.subscribe(resp => {
      const index = this._currentBoard.items.findIndex(item => item.id === +id);
      this._currentBoard.items.splice(index, 1);
      this.currentBoard.next(this._currentBoard);
    });
    return obs;
  }

  addBoard(payload) {
    const call = this.http.post(Settings.api.tasks.boards, payload).pipe(publishLast(), refCount());
    call.subscribe(response => {
      const board = new Board(response);
      this._taskBoards.push(board);
      this.taskBoards.next(this._taskBoards);
      this._newBoard(board);
    })
    return call;
  }
}
