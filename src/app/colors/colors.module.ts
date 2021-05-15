import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorsRoutingModule } from './colors-routing.module';
import { ColorsComponent } from './colors.component';


@NgModule({
  declarations: [
    ColorsComponent
  ],
  imports: [
    CommonModule,
    ColorsRoutingModule
  ]
})
export class ColorsModule { }
