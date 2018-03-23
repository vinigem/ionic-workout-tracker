import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ViewTasksPage } from '../pages/task/view-tasks.component';
import { CreateTaskPage } from '../pages/task/create-task.component';
import { AddCategoryPage } from '../pages/category/add-category.component';


@Component({
  templateUrl: 'app.component.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ViewTasksPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      { title: 'View Tasks', component: ViewTasksPage },
      { title: 'Create Task', component: CreateTaskPage },
      { title: 'Add Category', component: AddCategoryPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
