import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Settings } from '../settings/settings';
import { AuthService } from '../services/auth/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newReq: HttpRequest<any> = req;
    if (req.url.includes(Settings.api.base)) {
      let user = window.localStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        newReq = req.clone({
          headers: req.headers.set('Authorization', `Token ${user['token']}`)
        });
      }
    }
    return next.handle(newReq);
  }
}
