import {ClipboardModule} from '@angular/cdk/clipboard';
import {LayoutModule} from '@angular/cdk/layout';
import {TextFieldModule} from '@angular/cdk/text-field';
import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAnalyticsModule, CONFIG, ScreenTrackingService, UserTrackingService} from '@angular/fire/analytics';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule, BUCKET} from '@angular/fire/storage';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from 'src/environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ContactComponent} from './contact/contact.component';
import {HomeComponent} from './home/home.component';
import {SettingsComponent} from './settings/settings.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, ContactComponent, SettingsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule,
    LayoutModule,
    MatSlideToggleModule,
    ClipboardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    TextFieldModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAnalyticsModule,
  ],
  providers: [
    {provide: BUCKET, useValue: environment.firebase.storageBucket},
    ScreenTrackingService,
    UserTrackingService,
    {
      provide: CONFIG,
      useValue: {
        send_page_view: true,
        anonymize_ip: true,
        allow_ad_personalization_signals: false,
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
