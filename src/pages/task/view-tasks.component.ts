import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, Events } from 'ionic-angular';

import { TaskService } from '../../services/task.service';
import { WorkoutService } from '../../services/workout.service';
import { AuthService } from '../../services/auth.service';
import { AddTaskPage } from './add-task.component';

@Component({
  selector: 'view-tasks',
  templateUrl: 'view-tasks.component.html'
})
export class ViewTasksPage implements OnInit {

  tasks: any;
  fileteredTasks: any;
  searchString: string = '';
  workoutPopup: any;
  
  constructor(public taskService: TaskService, public workoutService: WorkoutService,
   public toastCtrl: ToastController, public navCtrl: NavController, public authService: AuthService,
   public events: Events) {
      this.events.subscribe('stoppedTimer', (workout: any) => {
        this.stopTask(workout);
        this.navCtrl.setRoot('ViewTasksPage').then(() => {
          this.events.unsubscribe('stoppedTimer');
        });
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
        let toast = this.toastCtrl.create({
          message: message,
          duration: 3000,
          position: 'top'
        });
        toast.present(); 
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
        let toast = this.toastCtrl.create({
          message: message,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      });
  }
 

}