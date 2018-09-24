import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '@core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.scss']
})
export class NewBoardComponent implements OnInit {
  newBoardName: string;
  @Input() noBoards: boolean = false;
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
  }

  addBoard() {
    this.api.addBoard({name: this.newBoardName}).subscribe(response => {
      if (this.router.url.includes('new-board')) {
        this.goBack();
      }
    });
  }

  goBack() {
    this.router.navigate(['/task/list']);
  }

}
