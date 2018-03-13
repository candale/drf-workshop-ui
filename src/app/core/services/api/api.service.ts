import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ApiService {
  boards: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    this.init();
  }

  private init() {
    this.http.get(``);
  }

}
