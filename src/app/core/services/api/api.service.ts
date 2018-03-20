import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/filter';

import { Settings } from '../../settings/settings';

@Injectable()
export class ApiService {
  taskBoards: BehaviorSubject<any> = new BehaviorSubject(null);
  listBoards: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    this.init();
  }

  init() {
    this.http.get(Settings.api.task).subscribe(response => {
      this.taskBoards.next(response);
    });

    this.http.get(Settings.api.list).subscribe(response => {
      this.listBoards.next(response);
    });
  }

  getTaskBoards() {
    return this.taskBoards.filter(item => item !== null);
  }

  getListBoards() {
    return this.listBoards.filter(item => item !== null);
  }

  removeItem(id) {
    return this.http.delete(Settings.api.item + `${id}/`);
  }

}
