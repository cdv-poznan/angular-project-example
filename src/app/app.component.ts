import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'Angular Project Example';

  public ngOnInit() {}

  public onClick($event: MouseEvent): void {
    console.log($event);
  }
}
