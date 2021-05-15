import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ContactComponent} from './contact/contact.component';
import {HomeComponent} from './home/home.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, ContactComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatIconModule, MatButtonModule, MatToolbarModule, MatTooltipModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
