import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Todo} from '../todo';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss'],
})
export class EditTodoComponent implements OnInit {
  private initialTodo: Todo;

  constructor(@Inject(MAT_DIALOG_DATA) public todo: Todo, private matDialogRef: MatDialogRef<EditTodoComponent>) {}

  ngOnInit(): void {
    this.initialTodo = {...this.todo};
  }

  public save(): void {
    this.matDialogRef.close(this.todo);
  }

  public cancel(): void {
    this.matDialogRef.close(this.initialTodo);
  }
}
