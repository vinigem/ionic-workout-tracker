import { Component, ViewChild } from '@angular/core';
import { ToastController, NavController } from 'ionic-angular';

import { SignUpPage } from '../signup/signup.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'signin',
  templateUrl: 'signin.component.html'
})
export class SignInPage {

    userData = {};

    constructor(public toastCtrl: ToastController, public navCtrl: NavController,
        public authService: AuthService) {}

    loadSignUpPage() {
        this.navCtrl.setRoot(SignUpPage);
    }

}