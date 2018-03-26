import { Component, OnInit } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { TaskService } from '../../service/task.service';
import { WorkoutService } from '../../service/workout.service';
import { AddTaskPage } from './add-task.component';

@Component({
  selector: 'view-tasks',
  templateUrl: 'view-tasks.component.html'
})
export class ViewTasksPage implements OnInit {

  tasks: any;
  fileteredTasks: any;
  searchString: string = '';
  workout: any;


  constructor(public taskService: TaskService, public workoutService: WorkoutService,
   public toastCtrl: ToastController, public navCtrl: NavController) { }

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
    this.workout = {
      task: task.title,
      startTime: new Date()
    };
  }

  stopTask() {
    this.workout.endTime = new Date();
    this.workoutService.saveWorkout(this.workout)
      .subscribe((status: boolean) => {
        let message: string;
        if(status) {
          message = 'Workout saved successfully';
          this.workout = null;
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
