import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

import { TaskService } from '../../services/task.service';
import { WorkoutService } from '../../services/workout.service';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';
import { AddTaskPage } from './add-task.component';

@Component({
  selector: 'view-tasks',
  templateUrl: 'view-tasks.component.html'
})
export class ViewTasksPage implements OnInit, OnDestroy {

  tasks: any;
  fileteredTasks: any;
  searchString: string = '';
  workoutPopup: any;
  
  constructor(public taskService: TaskService, public workoutService: WorkoutService,
   public messageService: MessageService, public navCtrl: NavController, public authService: AuthService,
   public events: Events) {
      this.events.subscribe('stoppedTimer', (workout: any) => {
        this.stopTask(workout);
      });
   }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks()
      .subscribe((data: any) => {
        this.tasks = data;
        this.fileteredTasks = data;
      })
  }

  setFilteredItems() {
    this.fileteredTasks = this.tasks.filter((task: any) => {
      return task.title.toLowerCase().indexOf(this.searchString.toLowerCase()) != -1;
    });
  }

  editTask(task: any) {
    this.navCtrl.push(AddTaskPage, task);
  }

  deleteTask(task: any) {
    this.taskService.deleteTask(task.title)
      .subscribe((status: boolean) => {
        let message: string;
        if(status) {
          message = 'Task deleted successfully';
          this.loadTasks();
        } else {
          message = 'Task was not deleted';
        }
        this.messageService.showMessage(message);
      });
  }
  
  startTask(task: any) {
    const workout = {
      task: task.title,
      startTime: new Date()
    };
    this.events.publish('showTimer', workout);
  }

  stopTask(workout: any) {
    workout.user = this.authService.getUsername();
    this.workoutService.saveWorkout(workout)
      .subscribe((status: boolean) => {
        let message: string;
        if(status) {
          message = 'Workout saved successfully';
        } else {
          message = 'Workout was not saved';
        }
        this.messageService.showMessage(message);
      });
  }

  ngOnDestroy() {
    this.events.unsubscribe('stoppedTimer');
  }
  
}