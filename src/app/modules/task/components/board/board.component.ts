import { Component, OnInit, Input } from '@angular/core';
import { trigger, keyframes, animate, transition, state, style } from '@angular/animations';

import { kf, kfTypes } from './keyframes';

import { Observable } from 'rxjs';

import { Board, Item, ApiService } from '@core';
import { MatBottomSheet } from '@angular/material';
import { DrawerComponent } from './drawer/drawer.component';

@Component({
  selector: 'mgr-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  animations: [
    trigger('itemAnimator', [
      transition('* => next', animate(300, keyframes(kf.next))),
      transition('* => previous', animate(300, keyframes(kf.previous))),
    ]),
  ]
})
export class BoardComponent implements OnInit {
  board: Board = null;
  boards: Array<Board> = [];
  noBoards: boolean = false;
  animationState: string = null;

  constructor(private api: ApiService, private drawer: MatBottomSheet) {
    this.api.getTaskBoards().subscribe(boards => {
      boards.length === 0 ? this.noBoards = true : this.noBoards = false;
      this.boards = boards;
    });
    this.getCurrentBoard();
  }

  ngOnInit() {
  }

  getCurrentBoard() {
    this.api.getCurrentBoard().subscribe((board) => {
      this.board = board;
      /** SORT Items list */
      if (this.board.items) {
        this.board.items.sort(this._descending);
      }
    });
  }

  startAnimationState(stateName, event) {
    if (stateName === kfTypes.next) {
      this.api.getNextBoard().subscribe(resp => {
        if (resp) {
          this.animationState = stateName;
        }
      });
    } else if (stateName === kfTypes.previous) {
      this.api.getPreviousBoard().subscribe(resp => {
        if (resp) {
          this.animationState = stateName;
        }
      });
    }
  }

  resetAnimationState(event) {
    this.animationState = null;
  }

  openDrawer(event) {
    this.drawer.open(DrawerComponent);
  }

  _descending(a: Item, b: Item) {
    if (b.priority === a.priority) {
      return b.id - a.id;
    }
    return b.priority - a.priority;
  }

  _ascending(a: Item, b: Item) {
    if (a.priority === b.priority) {
      return a.id - b.id;
    }
    return a.priority - b.priority;
  }

}
