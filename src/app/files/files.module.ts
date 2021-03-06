import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {TranslateModule} from '@ngx-translate/core';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {FilesRoutingModule} from './files-routing.module';
import {FilesComponent} from './files.component';

@NgModule({
  declarations: [FilesComponent, FileUploadComponent],
  imports: [
    CommonModule,
    FilesRoutingModule,
    MatRippleModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    TranslateModule.forChild(),
  ],
})
export class FilesModule {}
