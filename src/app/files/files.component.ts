import {Component, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {MatSelectionListChange} from '@angular/material/list';
import {UploadFile} from './upload-file';

const UPLOADS_DIR = 'app_uploads';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
})
export class FilesComponent implements OnInit {
  public files: UploadFile[] = [];

  constructor(private angularFireStorage: AngularFireStorage) {}

  ngOnInit(): void {}

  public onFilesChanged(files: File[]): void {
    this.files = files.map(file => ({
      file,
      progress: 0,
      uploading: false,
      selected: false,
      done: false,
    }));
  }

  public onSelectionChange(change: MatSelectionListChange): void {
    change.source.options.forEach((option, index) => {
      this.files[index].selected = option.selected;
    });
  }

  public uploadSelected(): void {
    this.files
      .filter(file => file.selected && !file.done)
      .forEach(file => {
        this.uploadFile(file);
      });
  }

  private async uploadFile(upload: UploadFile): Promise<void> {
    const task = this.angularFireStorage.upload(`${UPLOADS_DIR}/${upload.file.name}`, upload.file);
    task.snapshotChanges().subscribe(snapshot => {
      if (snapshot.state === 'running') {
        upload.uploading = true;

        task.percentageChanges().subscribe(progress => {
          upload.progress = progress;
        });
      }
      if (snapshot.state === 'success') {
        upload.uploading = false;
        upload.done = true;
      }
    });
  }
}
