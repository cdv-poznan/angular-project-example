import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
})
export class FilesComponent implements OnInit {
  public files: File[] = [];

  constructor() {}

  ngOnInit(): void {}

  public onFilesChanged(files: File[]): void {
    this.files = files;
  }

  public uploadSelected(): void {
  }
}
