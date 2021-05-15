import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {ColorsRoutingModule} from './colors-routing.module';
import {ColorsComponent} from './colors.component';

@NgModule({
  declarations: [ColorsComponent],
  imports: [CommonModule, ColorsRoutingModule, MatTableModule, MatSortModule],
})
export class ColorsModule {}
