import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { AddCategoryPage } from '../category/add-category.component';
import { ViewTasksPage } from './view-tasks.component';
import { CategoryService } from '../../services/category.service';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'add-task',
  templateUrl: 'add-task.component.html'
})
export class AddTaskPage implements OnInit {

  task: any = {};
  categories: Array<any>;
  edit: boolean;

  constructor(public categoryService: CategoryService, public taskService: TaskService,
   public messageService: MessageService, public navCtrl: NavController, public navParams: NavParams,
   public authService: AuthService, public events: Events) { }

  ngOnInit() {
    this.loadCategories();
    
    if(this.navParams.get('title')) {
      this.task = {
        title: this.navParams.get('title'),
        note: this.navParams.get('note'),
        calories: this.navParams.get('calories'),
        category: this.navParams.get('category')
      };
      this.edit = true;
    }

    this.events.subscribe('categoryModified', () => {
      this.loadCategories();
    });
  }

  loadCategories() {
    this.categoryService.getCategories()
      .subscribe((data: Array<any>) => {
        this.categories = data;
      });
  }

  addCategory() {
    this.navCtrl.push(AddCategoryPage);
  }

  saveTask() {
    let message: string;
    if(this.task.title == null || this.task.title.trim().length == 0) {
      message = 'Please add title';
    } else if (this.task.calories <= 0) {
      message = 'Please set calories burnt per minute greater than 0';
    } else if (this.task.category == null || this.task.category.trim().length == 0) {
      message = 'Please select a category';
    }

    if(message != null) {
      this.messageService.showMessage(message);
    } else {
      this.task.user = this.authService.getUsername();
      this.taskService.saveTask(this.task, this.edit != null)
        .subscribe((status: string) => {
          if(status == 'SUCCESS') {
            message = 'Task saved successfully';
            if(this.edit) {
              this.goBack();
            } else {
              this.navCtrl.setRoot(ViewTasksPage);
            }
          } else if(status == 'ERROR') {
            message = 'Task was not saved';
          } else if(status == 'EXIST') {
            message = 'Task already exist';
          }
          this.messageService.showMessage(message);
        });
    }
  }

  increment() {
    this.task.calories = this.task.calories == null ? 0 : this.task.calories;
    this.task.calories = parseFloat((parseFloat(this.task.calories) + 0.1).toFixed(1));
  }

  decrement() {
    if(this.task.calories > 0) {
      this.task.calories = parseFloat((parseFloat(this.task.calories) - 0.1).toFixed(1));
    }
  }

  goBack() {
    this.navCtrl.pop();
  }

}