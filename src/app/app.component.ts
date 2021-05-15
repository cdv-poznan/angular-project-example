import {BreakpointObserver, Breakpoints, MediaMatcher} from '@angular/cdk/layout';
import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'Angular Project Example';
  public smallScreen$: Observable<boolean>;
  public user$: Observable<firebase.User>;

  constructor(
    private beakpointObserver: BreakpointObserver,
    private mediaMatcher: MediaMatcher,
    private angularFireAuth: AngularFireAuth,
  ) {}

  public ngOnInit() {
    const breakpoints = [Breakpoints.XSmall, Breakpoints.Small];
    const breakpoints$ = this.beakpointObserver.observe(breakpoints);
    this.smallScreen$ = breakpoints$.pipe(map(state => state.matches));

    const media: MediaQueryList = this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)');

    if (media.matches) {
      document.body.classList.add('dark-theme');
    }

    this.user$ = this.angularFireAuth.user;
  }

  public signIn(): void {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.angularFireAuth.signInWithPopup(provider);
  }

  public signOut(): void {
    this.angularFireAuth.signOut();
  }
}
