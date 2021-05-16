import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public darkTheme = false;
  public defaultLanguage: string;

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.darkTheme = document.body.classList.contains('dark-theme');
    this.defaultLanguage = this.translateService.defaultLang;
  }

  public changeTheme(): void {
    document.body.classList.toggle('dark-theme');
  }

  public setLanguage(lang: string): void {
    this.translateService.use(lang);
  }
}
