import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {

  constructor(private ref: MatBottomSheetRef<DrawerComponent>, private router: Router) { }

  ngOnInit() {
  }

  newBoardNavigate() {
    this.ref.dismiss();
    event.preventDefault();
    this.router.navigate(['/task/new-board']);
  }

}
