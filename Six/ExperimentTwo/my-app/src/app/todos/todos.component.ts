import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe((todos) => (this.todos = todos));
  }

  add(summary: string, description: string): void {
    summary = summary.trim();
    description = description.trim();

    if (!summary) {
      return;
    }
    if (!description) {
      description = '';
    }
    this.todoService
      .addTodo({ summary, description } as Todo)
      .subscribe((todo) => {
        this.todos.push(todo);
      });
  }

  delete(todo: Todo): void {
    this.todos = this.todos.filter((t) => t !== todo);
    this.todoService.deleteTodo(todo.id).subscribe();
  }
}
