import {Component, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';

const UPLOADS_DIR = 'app_uploads';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
})
export class FilesComponent implements OnInit {
  public files: File[] = [];

  constructor(private angularFireStorage: AngularFireStorage) {}

  ngOnInit(): void {
    console.log(this.angularFireStorage);
  }

  public onFilesChanged(files: File[]): void {
    this.files = files;
  }

  public uploadSelected(): void {
    // TODO: upload all selected files
    this.uploadFile(this.files[0]);
  }

  private async uploadFile(file: File): Promise<void> {
    const task = this.angularFireStorage.upload(`${UPLOADS_DIR}/${file.name}`, file);
  }
}
