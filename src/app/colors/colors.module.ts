import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {ColorsRoutingModule} from './colors-routing.module';
import {ColorsComponent} from './colors.component';

@NgModule({
  declarations: [ColorsComponent],
  imports: [
    CommonModule,
    ColorsRoutingModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ColorsModule {}
