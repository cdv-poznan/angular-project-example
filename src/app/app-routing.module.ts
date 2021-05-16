import {NgModule} from '@angular/core';
import {AngularFireAuthGuard} from '@angular/fire/auth-guard';
import {RouterModule, Routes} from '@angular/router';
import {ContactComponent} from './contact/contact.component';
import {HomeComponent} from './home/home.component';
import {SettingsComponent} from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {path: 'colors', loadChildren: () => import('./colors/colors.module').then(m => m.ColorsModule)},
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AngularFireAuthGuard],
  },
  {path: 'files', loadChildren: () => import('./files/files.module').then(m => m.FilesModule), canActivate: [AngularFireAuthGuard]},
  {path: 'todo', loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
