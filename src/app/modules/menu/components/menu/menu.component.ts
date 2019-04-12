import { Component, OnInit } from '@angular/core';
import { AuthService, Settings } from '@core';
import { Router } from '@angular/router';
import { User } from '@core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  user: User;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {

  }

  logout() {
    this.auth.logout();
  }

  goToDone() {
    this.router.navigate(['/task/done']);
  }

  goToAdmin() {
    window.location.href = Settings.baseAdmin;
  }

}
