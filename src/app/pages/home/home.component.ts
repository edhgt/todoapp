import { NgFor, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';

import { Task } from '../../models/task';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ NgFor, NgIf ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Crear proyecto',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Crear componentes',
      completed: false
    }
  ]);

  
  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    this.addTask(input.value);
    input.value = '';
  }
  
  addTask(title: string) {
    const task: Task = {
      id: Date.now(),
      title: title,
      completed: false
    }

    this.tasks.update(tasks => [...tasks, task]);
  }

  deleteTask(index: number) {
    this.tasks.update(tasks => tasks.filter((task, position) => position !== index));
  }

  updateTask(index: number) {
    this.tasks.update(tasks => {
      return tasks.map((task, position) => {
        if(position !== index) {
          return task;
        }
        return {
          ...task,
          completed: !task.completed
        }
      })
    });
  }
}
