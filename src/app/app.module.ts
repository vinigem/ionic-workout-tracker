import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';

import { MyApp } from './app.component';
import { ViewTasksPage } from '../pages/task/view-tasks.component';
import { AddTaskPage } from '../pages/task/add-task.component';
import { AddCategoryPage } from '../pages/category/add-category.component';
import { TrackPage } from '../pages/track/track.component';

import { CategoryService } from '../service/category.service';
import { TaskService } from '../service/task.service';
import { WorkoutService } from '../service/workout.service';
import { LoaderService } from '../service/loader.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp, ViewTasksPage, AddTaskPage, AddCategoryPage, TrackPage
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule,
    IonicModule.forRoot(MyApp), ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, ViewTasksPage, AddTaskPage, AddCategoryPage, TrackPage
  ],
  providers: [
    StatusBar, SplashScreen, {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoryService, TaskService, WorkoutService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderService, multi: true }
  ]
})
export class AppModule {}
