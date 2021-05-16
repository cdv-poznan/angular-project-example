import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, CollectionReference} from '@angular/fire/firestore';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import firebase from 'firebase/app';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {EditTodoComponent} from './edit-todo/edit-todo.component';
import {Todo} from './todo';

const TODOS = 'todos';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  public email$: Observable<string>;
  public todos$: Observable<Todo[]>;

  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.email$ = this.auth.user.pipe(map(user => user?.email ?? ''));

    this.todos$ = this.email$.pipe(
      map(email => this.firestore.collection<Todo>(TODOS, ref => ref.where('user', '==', email))),
      switchMap(collection => collection.valueChanges({idField: 'id'})),
    );
  }

  public addTodo(task: string): void {
    this.email$.subscribe(user => {
      this.firestore.collection<Omit<Todo, 'id'>>(TODOS).add({
        task,
        user,
        done: false,
        created: Date.now(),
      });
    });
  }

  public editTask(todo: Todo): void {
    const config: MatDialogConfig = {
      position: {
        top: '100px',
      },
      data: todo,
      disableClose: true,
    };
    const dialog: MatDialogRef<EditTodoComponent, Todo> = this.matDialog.open(EditTodoComponent, config);
    const closed$ = dialog.afterClosed();

    closed$.subscribe(task => {
      this.getDoc(task.id).set(task);
    });
  }

  public doneTask(id: string): void {
    const doc: AngularFirestoreDocument<Todo> = this.getDoc(id);
    doc.update({done: true});
  }

  public deleteTask(id: string): void {
    this.getDoc(id).delete();
  }

  private getDoc(id: string): AngularFirestoreDocument<Todo> {
    return this.firestore.doc<Todo>(`${TODOS}/${id}`);
  }
}
