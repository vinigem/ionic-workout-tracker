import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { SignInPage } from '../pages/signin/signin.component';
import { SignUpPage } from '../pages/signup/signup.component';
import { ViewTasksPage } from '../pages/task/view-tasks.component';
import { AddTaskPage } from '../pages/task/add-task.component';
import { AddCategoryPage } from '../pages/category/add-category.component';
import { TrackPage } from '../pages/track/track.component';

import { CategoryService } from '../services/category.service';
import { TaskService } from '../services/task.service';
import { WorkoutService } from '../services/workout.service';
import { LoaderService } from '../services/loader.service';
import { AuthService } from '../services/auth.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp, SignInPage, SignUpPage, ViewTasksPage, AddTaskPage, AddCategoryPage, TrackPage
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule,
    IonicModule.forRoot(MyApp), ChartsModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, SignInPage, SignUpPage, ViewTasksPage, AddTaskPage, AddCategoryPage, TrackPage
  ],
  providers: [
    StatusBar, SplashScreen, {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoryService, TaskService, WorkoutService, AuthService, 
    { provide: HTTP_INTERCEPTORS, useClass: LoaderService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthService, multi: true }
  ]
})
export class AppModule {}
