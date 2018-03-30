import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { SignInPage } from '../pages/signin/signin.component';
import { ViewTasksPage } from '../pages/task/view-tasks.component';
import { AddTaskPage } from '../pages/task/add-task.component';
import { AddCategoryPage } from '../pages/category/add-category.component';
import { TrackPage } from '../pages/track/track.component';


@Component({
  templateUrl: 'app.component.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ViewTasksPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen, public storage: Storage) {
    this.initializeApp();

    this.pages = [
      { title: 'View Tasks', component: ViewTasksPage },
      { title: 'Add Task', component: AddTaskPage },
      { title: 'Add Category', component: AddCategoryPage },
      { title: 'Track', component: TrackPage }
    ];

    this.storage.get('auth_token').then((val) => {
      if(val == null) {
        this.nav.setRoot(SignInPage);  
      }
    });
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
