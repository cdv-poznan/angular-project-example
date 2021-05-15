import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  @Output() public filesSelected = new EventEmitter<File[]>();

  constructor() {}

  ngOnInit(): void {}

  public onFilesChanged(files: FileList): void {
    this.filesSelected.emit(Array.from(files));
  }
}
