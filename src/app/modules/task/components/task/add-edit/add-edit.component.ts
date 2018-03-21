import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'task-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditTaskComponent implements OnInit {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', ],
      dueDate: ['', ],
      priority: ['', Validators.required],
      group: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  submit() {

  }

}
