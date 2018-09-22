import { Component, OnInit, Input } from '@angular/core';
import { trigger, keyframes, animate, transition, state, style } from '@angular/animations';

import { kf, kfTypes } from './keyframes';

import { Observable } from 'rxjs';

import { Board, Item, ApiService } from '@core';

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
  animationState: string = null;

  constructor(private api: ApiService) {
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

  _descending(a: Item, b: Item) {
    return b.priority - a.priority;
  }

  _ascending(a: Item, b: Item) {
    return a.priority - b.priority;
  }

}
