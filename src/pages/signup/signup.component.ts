import { Component } from '@angular/core';
import { ToastController, NavController } from 'ionic-angular';

import { SignInPage } from '../signin/signin.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'signup',
  templateUrl: 'signup.component.html'
})
export class SignUpPage {

    userData = {};

    constructor(public toastCtrl: ToastController, public navCtrl: NavController,
        public authService: AuthService) {}

    loadSignInPage() {
        this.navCtrl.setRoot(SignInPage);
    }

}