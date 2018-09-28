import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private swUpdate: SwUpdate ,private snackbar: MatSnackBar) {
    
  }
  
  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate().then(() => {
        console.log('[App] checkForUpdate completed');
      })
        .catch(err => {
          console.error(err);
        });
      this.swUpdate.available.subscribe(event => {
        console.log('[App] Update available: current version is', event.current, 'available version is', event.available);
        const snackbarRef = this.snackbar.open('New version available!', 'Refresh');
        snackbarRef.onAction().pipe(take(1)).subscribe(() => {
          window.location.reload();
        });
      });
    }
  }
}
