import {ClipboardModule} from '@angular/cdk/clipboard';
import {LayoutModule} from '@angular/cdk/layout';
import {TextFieldModule} from '@angular/cdk/text-field';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Injectable, NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAnalyticsModule, CONFIG, ScreenTrackingService, UserTrackingService} from '@angular/fire/analytics';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule, BUCKET} from '@angular/fire/storage';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ContactComponent} from './contact/contact.component';
import {HomeComponent} from './home/home.component';
import {SettingsComponent} from './settings/settings.component';

@Injectable({providedIn: 'root'})
export class FirebaseTranslateLoader implements TranslateLoader {
  constructor(private angularFirestore: AngularFirestore) {}

  public getTranslation(lang: string): Observable<any> {
    return this.angularFirestore
      .collection<any>('translations')
      .valueChanges()
      .pipe(
        tap(console.log),
        map(translations =>
          translations.reduce((accumulator: {[key: string]: string}, current: {[key: string]: any}) => {
            accumulator[current.key] = current[lang];
            return accumulator;
          }, {}),
        ),
        tap(console.log),
      );
  }
}

export function HttpLoaderFactory(httpClient: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(httpClient, '/assets/i18n/', '.json');
}

export function FirebaseLoaderFactory(angularFirestore: AngularFirestore): TranslateLoader {
  return new FirebaseTranslateLoader(angularFirestore);
}

@NgModule({
  declarations: [AppComponent, HomeComponent, ContactComponent, SettingsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
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
    MatSelectModule,
    TextFieldModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAnalyticsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'pl',
      useDefaultLang: true,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
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
