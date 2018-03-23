import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { ViewTasksPage } from '../pages/task/view-tasks.component';
import { AddTaskPage } from '../pages/task/add-task.component';
import { AddCategoryPage } from '../pages/category/add-category.component';

import { CategoryService } from '../service/category.service';
import { TaskService } from '../service/task.service';
import { WorkoutService } from '../service/workout.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp, ViewTasksPage, AddTaskPage, AddCategoryPage
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, ViewTasksPage, CreateTaskPage, AddCategoryPage
  ],
  providers: [
    StatusBar, SplashScreen, {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoryService, TaskService, WorkoutService
  ]
})
export class AppModule {}
