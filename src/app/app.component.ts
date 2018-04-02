import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
    public splashScreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      { title: 'View Tasks', component: ViewTasksPage },
      { title: 'Add Task', component: AddTaskPage },
      { title: 'Add Category', component: AddCategoryPage },
      { title: 'Track', component: TrackPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      const accessToken = localStorage.getItem('access_token');
      if(accessToken == null) {
        this.nav.setRoot(SignInPage);  
      }
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
