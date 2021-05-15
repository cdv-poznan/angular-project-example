import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public darkTheme = false;

  constructor() {}

  ngOnInit(): void {
    this.darkTheme = document.body.classList.contains('dark-theme');
  }

  public changeTheme(): void {
    document.body.classList.toggle('dark-theme');
  }
}
