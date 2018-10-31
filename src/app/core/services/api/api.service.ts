
import {filter, publishLast, refCount, map, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

import { Settings } from '../../settings/settings';
import { Board } from '../../models/board.model';
import { Item } from '../../models/item.model';
import { ItemState } from '../../models/itemState.model';
import { util } from '../../utils/util';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class ApiService {
  taskBoards: BehaviorSubject<any> = new BehaviorSubject(null);
  currentBoard: BehaviorSubject<Board> = new BehaviorSubject(null);

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
      this.taskBoards.next(response);
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
    const index = this.taskBoards.getValue().findIndex(item => item.id === this.currentBoard.getValue().id);
    if (index !== 0) {
      this._newBoard(this.taskBoards.getValue()[index - 1]);
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
    const index = this.taskBoards.getValue().findIndex(item => item.id === this.currentBoard.getValue().id);
    if (index < this.taskBoards.getValue().length - 1) {
      this._newBoard(this.taskBoards.getValue()[index + 1]);
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
    return this.taskBoards.pipe(
      filter(board => board !== null), 
      tap(boards => this.createBoardsOrder(boards))
    );
  }

  getDoneTasks() {
    const call = this.http.get(`${Settings.api.tasks.done_items}`).pipe(publishLast(), refCount());
    call.subscribe(result => {
      //
    });
    return call;
  }

  getBoardItems(boardId) {
    return this.http.get(`${Settings.api.tasks.items}?board=${+boardId}`);
  }

  private createBoardsOrder(boards) {
    boards.forEach((board, index) => {
      board.order = index + 1;
    });
  }

  private _newBoard(board: Board) {
    this.getBoardItems(board.id).subscribe((items: Array<Item>) => {
      items.forEach(item => {
        item = new Item(item);
      });
      board.items = items;
      this.currentBoard.next(new Board(board));
    });
  }

  /** Item functions */

  getItem(id) {
    return this.currentBoard.getValue().items.find(item => item.id === +id);
  }

  removeItem(id) {
    const obs = this.http.delete(Settings.api.tasks.items + `${id}/`).pipe(publishLast(),refCount(),);
    obs.subscribe(resp => {
      const index = this.currentBoard.getValue().items.findIndex(item => item.id === +id);
      this.currentBoard.getValue().items.splice(index, 1);
      this.currentBoard.next(this.currentBoard.getValue());
    });
    return obs;
  }

  addItem(payload) {
    if (payload.due_date) {
      payload.due_date = util.parseDate(payload.due_date);
    }
    const obs = this.http.post(Settings.api.tasks.items, payload).pipe(publishLast(),refCount(),);
    obs.subscribe(resp => {
      this.currentBoard.getValue().items.push(new Item(resp));
      this.currentBoard.next(this.currentBoard.getValue());
    });
    return obs;
  }

  moveItem(board, id) {
    const obs = this.http.patch(`${Settings.api.tasks.items}${+id}/`, {board: board}).pipe(publishLast(),refCount(),);
    obs.subscribe(resp => {
      const index = this.currentBoard.getValue().items.findIndex(item => item.id === +id);
      this.currentBoard.getValue().items.splice(index, 1);
      this.currentBoard.next(this.currentBoard.getValue());
    });
    return obs;
  }

  editItem(payload, id) {
    if (payload.due_date) {
      payload.due_date = util.parseDate(payload.due_date);
    }
    const obs = this.http.patch(`${Settings.api.tasks.items}${+id}/`, payload).pipe(publishLast(),refCount(),);
    obs.subscribe(resp => {
      const index = this.currentBoard.getValue().items.findIndex(item => item.id === +id);
      this.currentBoard.getValue().items[index] = new Item(resp);
      this.currentBoard.next(this.currentBoard.getValue());
    });
    return obs;
  }

  markItemAsDone(id) {
    const obs = this.http.patch(Settings.api.tasks.items + `${id}/`, {state: ItemState.DONE}).pipe(
      publishLast(),refCount(),);
    obs.subscribe(resp => {
      const index = this.currentBoard.getValue().items.findIndex(item => item.id === +id);
      this.currentBoard.getValue().items.splice(index, 1);
      this.currentBoard.next(this.currentBoard.getValue());
    });
    return obs;
  }

  addBoard(payload) {
    const call = this.http.post(Settings.api.tasks.boards, payload).pipe(publishLast(), refCount());
    call.subscribe(response => {
      const board = new Board(response);
      this.taskBoards.getValue().push(board);
      this.taskBoards.next(this.taskBoards.getValue());
      this._newBoard(board);
    })
    return call;
  }

  editBoardName(name) {
    const call = this.http.patch(Settings.api.tasks.boards + `${this.currentBoard.getValue().id}/`, {name: name})
    .pipe(publishLast(), refCount());
    call.subscribe(result => {
      const boards = this.taskBoards.getValue();
      const index = boards.findIndex(item => item.id === this.currentBoard.getValue().id);
      boards[index].name = result.name;
      this.currentBoard.getValue().name = result.name;
      this.taskBoards.next(boards);
      this.currentBoard.next(this.currentBoard.getValue());
    });
    return call;
  }

  deleteBoard() {
    const call = this.http.delete(Settings.api.tasks.boards + `${this.currentBoard.getValue().id}/`)
    .pipe(publishLast(), refCount());
    call.subscribe(result => {
      const boards: Array<Board> = this.taskBoards.getValue(); 
      const currentBoardId = this.currentBoard.getValue().id;
      const index = this.taskBoards.getValue().findIndex(item => item.id === currentBoardId);
      boards.splice(index, 1);
      this.createBoardsOrder(boards);
      this.taskBoards.next(boards);
      if (boards.length) {
        this.currentBoard.next(boards[0]);
        this._newBoard(boards[0]);
      }
      else {
        this.currentBoard.next(undefined);
        console.log('there are no more boards!');
      }
    });
    return call;
  }
}
