import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'mgr-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  active: String = '';

  constructor(private router: Router, private activeRoute: ActivatedRoute) {
    this.router.events.pipe(filter(url => url instanceof NavigationEnd))
    .subscribe((navigation: NavigationEnd) => {
      this.active = navigation.url;
    })
    // this.router.url
  }

  ngOnInit() {
  }

  changeRoute(route) {
    this.active = route;
    this.router.navigate([route]);
  }

}
