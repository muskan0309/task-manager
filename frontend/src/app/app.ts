import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from './services/task.service';
import { Task } from './models/task.model';
 
@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  tasks = signal<Task[]>([]);
  newTaskTitle = '';
 
  constructor(private taskService: TaskService) {}
 
  ngOnInit(): void {
    this.loadTasks();
  }
 
  loadTasks(): void {
    this.taskService.getTasks().subscribe(data => {
      this.tasks.set(data);
    });
  }
 
  addTask(): void {
    if (!this.newTaskTitle.trim()) {
      return;
    }
    const task = { title: this.newTaskTitle, isCompleted: false };
    this.taskService.createTask(task).subscribe(() => {
      this.newTaskTitle = '';
      this.loadTasks();
    });
  }

  toggleComplete(task: Task): void {
    const updated = { title: task.title, isCompleted: !task.isCompleted };
    this.taskService.updateTask(task.id, updated).subscribe(() => {
      this.loadTasks();
    });
  }
 
  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }
} 