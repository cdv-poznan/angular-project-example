import {Component, OnInit} from '@angular/core';
import {AngularFireAnalytics} from '@angular/fire/analytics';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {MatSelectionListChange} from '@angular/material/list';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {UploadFile} from './upload-file';

const UPLOADS_DIR = 'app_uploads';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
})
export class FilesComponent implements OnInit {
  public files: UploadFile[] = [];
  public images$: Observable<any[]>;

  constructor(
    private angularFireStorage: AngularFireStorage,
    private angularFirestore: AngularFirestore,
    private analytics: AngularFireAnalytics,
  ) {}

  ngOnInit(): void {
    this.images$ = this.angularFirestore.collection('files').valueChanges();
  }

  public onFilesChanged(files: File[]): void {
    this.analytics.logEvent('files_selected');
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
    this.analytics.logEvent('files_upload_started');
    this.files
      .filter(file => file.selected && !file.done)
      .forEach(file => {
        this.uploadFile(file);
      });
  }

  private async uploadFile(upload: UploadFile): Promise<void> {
    const path = `${UPLOADS_DIR}/${upload.file.name}`;
    const task = this.angularFireStorage.upload(path, upload.file);
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

        snapshot.ref.getDownloadURL().then(url => {
          this.angularFirestore.collection('files').add({
            url,
            path,
            name: upload.file.name,
          });
        });
      }
    });
  }
}
