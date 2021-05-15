import {Component, OnInit} from '@angular/core';
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  constructor(private matSnackBar: MatSnackBar) {}

  ngOnInit(): void {}

  public onCopiedToClipboard(success: boolean): void {
    if (success) {
      const snackbar: MatSnackBarRef<TextOnlySnackBar> = this.matSnackBar.open('Message has been copied to clipboard', 'Ok', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 10000,
      });

      snackbar.onAction().subscribe(() => {
        console.log('ok');
      });
    }
  }
}
