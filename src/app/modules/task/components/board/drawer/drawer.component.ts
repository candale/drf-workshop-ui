import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from '@core';

@Component({
  selector: 'app-board-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {
  constructor(
    private ref: MatBottomSheetRef<DrawerComponent>,
    private router: Router,
    private api: ApiService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  newBoardNavigate() {
    this.dismiss();
    this.router.navigate(['/task/new-board']);
  }

  changeBoardName() {
    const dialogRef = this.dialog.open(ChangeNameDialog, {
      width: '300px',
      data: { name: '' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.api.editBoardName(result);
      this.dismiss();
    })
  }

  deleteBoard() {
    this.api.deleteBoard().subscribe(result => {
      this.dismiss();
    })
  }

  private dismiss() {
    this.ref.dismiss();
    event.preventDefault();
  }

}

export interface DialogData {
  name: string;
}

@Component({
  selector: 'change-name-dialog',
  templateUrl: 'change-name-dialog.html',
})
export class ChangeNameDialog {

  constructor(
    public dialogRef: MatDialogRef<ChangeNameDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}