import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Item, ApiService, util } from '@core';

enum State {
  ADD = 'Add',
  EDIT = 'Edit',
}

@Component({
  selector: 'task-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditTaskComponent implements OnInit {
  taskForm: FormGroup;
  item: Item = null;
  stateText: string = State.ADD;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.item = this.api.getItem(params['id']);
        this.stateText = State.EDIT;
      }
      this.taskForm = this.fb.group({
        name: [this.item ? this.item.name : null, Validators.required],
        description: [this.item ? this.item.description : null, ],
        due_date: [this.item ? this.item.due_date : null, ],
        priority: [this.item ? this.item.priority : 0, Validators.required],
        board: [this.api.getCurrentBoardValue().id, Validators.required]
      });
    });
  }

  ngOnInit() {
    if (this.item) {
      this._changeColor(util.getPriorityColor(this.item.priority));
    }
  }

  submit() {
    if (this.item) {
      if (util.checkEqual(this.item.value, this.taskForm.value)) {
        this.router.navigate(['task/list']);
      } else {
        this.api.editItem(this.taskForm.value, this.item.id).subscribe(response => {
          this.router.navigate(['task/list']);
        });
      }
    } else {
      this.api.addItem(this.taskForm.value).subscribe(response => {
        this.router.navigate(['task/list']);
      });
    }
  }

  setToday() {
    this.taskForm.controls['due_date'].setValue(new Date());
  }

  move(event) {
    this._changeColor(util.getPriorityColor(+event.value));
  }

  _changeColor(color) {
    const thumb = <HTMLElement>document.querySelector('.mat-slider-thumb');
    const thumbLabel = <HTMLElement>document.querySelector('.mat-slider-thumb-label');
    const trackFill = <HTMLElement>document.querySelector('.mat-slider-track-fill');
    thumb.style['background-color'] = color;
    thumbLabel.style['background-color'] = color;
    trackFill.style['background-color'] = color;
  }
}
