import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

interface Todo {
  task: string;
  done: boolean;
  created: number;
  id?: string;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  public todos$: Observable<Todo[]>;

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    const collection: AngularFirestoreCollection<Todo> = this.firestore.collection<Todo>('todos');

    this.todos$ = collection.valueChanges({ idField: 'id' });

    this.todos$.subscribe(console.log);
  }

  public addTodo(): void {
    this.firestore.collection<Todo>('todos').add({
      task: 'Learn Firebase',
      created: Date.now(),
      done: false,
    });
  }

  public deleteTask(todo: Todo): void {
    const id = todo.id;
    const doc: AngularFirestoreDocument<Todo> = this.firestore.doc<Todo>(`todos/${id}`);
    doc.delete();
  }
}
