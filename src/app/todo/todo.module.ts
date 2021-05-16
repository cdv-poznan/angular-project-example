import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {EditTodoComponent} from './edit-todo/edit-todo.component';
import {TodoRoutingModule} from './todo-routing.module';
import {TodoComponent} from './todo.component';

@NgModule({
  declarations: [TodoComponent, EditTodoComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
  ],
})
export class TodoModule {}
