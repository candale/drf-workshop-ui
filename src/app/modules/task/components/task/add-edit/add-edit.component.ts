import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService, util } from '@core';

@Component({
  selector: 'task-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditTaskComponent implements OnInit {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.taskForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, ],
      dueDate: [new Date(), ],
      priority: [0, Validators.required],
      board: [this.api.getCurrentBoardValue().id, Validators.required]
    });
  }

  ngOnInit() {
  }

  submit() {
    this.api.addItem(this.taskForm.value).subscribe(response => {
      this.router.navigate(['task/list']);
      console.log(response);
    });
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
