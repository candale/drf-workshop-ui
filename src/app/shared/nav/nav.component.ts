import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { AuthService } from '../../core/services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'mgr-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  active: String = '';
  visible: Observable<boolean>;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private auth: AuthService) {
    this.router.events.pipe(filter(url => url instanceof NavigationEnd))
    .subscribe((navigation: NavigationEnd) => {
      this.active = navigation.url;
    });
    this.visible = this.auth.isLoggedInObservable();
  }

  ngOnInit() {
  }

  changeRoute(route) {
    this.active = route;
    this.router.navigate([route]);
  }

}
