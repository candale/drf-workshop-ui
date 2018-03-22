import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { trigger, keyframes, animate, transition, state, style } from '@angular/animations';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { kf, kfStrings } from './keyframes';

import { Item, ApiService, util } from '@core';

@Component({
  selector: 'board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
  animations: [
    trigger('itemAnimator', [
      transition('* => slideOutLeft', animate(500, keyframes(kf.slideOutLeft))),
      transition('* => slideOutRight', animate(500, keyframes(kf.slideOutRight))),
    ]),
  ]
})
export class BoardItemComponent implements OnInit, AfterViewInit {
  @Input() item: Item;
  animationState: string;
  actionStack: Array<any> = [];
  undoCalled: Boolean = false;

  constructor(public snackBar: MatSnackBar, private api: ApiService, private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  startAnimationState(stateName, event) {
    if (!this.animationState) {
      this.animationState = stateName;
    }
  }

  resetAnimationState(event) {
    this.animationState = '';
    if (kfStrings.includes(event.fromState)) {
      this.item.hidden = true;
      let msg = '';
      if (event.fromState === kfStrings[0]) {
        msg = '1 item deleted';
      } else if (event.fromState === kfStrings[1]) {
        msg = '1 item marked DONE';
      }
      this.openSnackBar(msg);
    }
  }

  openSnackBar(actionType) {
    const snackBarRef = this.snackBar.open(actionType, 'Undo', { duration: 10000, panelClass: ['height-60'] });
    snackBarRef.onAction().subscribe(() => {
      this.item.hidden = false;
    });
    snackBarRef.afterDismissed().subscribe(() => {
      if (this.item.hidden === true) {
        this.api.removeItem(this.item.id);
      }
    });
  }

  getColor() {
    return util.getPriorityColor(this.item.priority);
  }

  edit() {
    if (!this.animationState) {
      this.router.navigate([`/task/add-edit/${this.item.id}`]);
    }
  }

  checkDate() {

    if (this.item.due_date) {
      if (util.parseDate(this.item.due_date) === util.parseDate(new Date())) {
        return 'today';
      } else if (this.item.due_date < new Date()) {
        return 'past-date';
      }
    }
    return 'normal';
  }

  markDone() {

  }

  remove() {

  }

}
