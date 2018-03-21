import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { trigger, keyframes, animate, transition, state, style } from '@angular/animations';
import { MatSnackBar } from '@angular/material';

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
  wrapContainer: HTMLElement;
  undoCalled: Boolean = false;

  constructor(public snackBar: MatSnackBar, private api: ApiService) { }

  ngOnInit() {
    console.log(this.item);
  }

  ngAfterViewInit() {
    this.wrapContainer = <HTMLElement>document.querySelector(`#wrap-container-${this.item.id}`);
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
      console.log(this.item.hidden);
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
    console.log('edit func');
  }

  markDone() {

  }

  remove() {

  }

}
