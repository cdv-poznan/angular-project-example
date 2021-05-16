import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {Todo} from './todo';

const TODOS = 'todos';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  public todos$: Observable<Todo[]>;

  constructor(private firestore: AngularFirestore, private matDialog: MatDialog) {}

  ngOnInit(): void {
    const collection: AngularFirestoreCollection<Todo> = this.firestore.collection<Todo>(TODOS);

    this.todos$ = collection.valueChanges({idField: 'id'});

    this.todos$.subscribe(console.log);
  }

  public addTodo(task: string): void {
    this.firestore.collection<Omit<Todo, 'id'>>(TODOS).add({
      task,
      done: false,
      created: Date.now(),
    });
  }

  public editTask(todo: Todo): void {
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
