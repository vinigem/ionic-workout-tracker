import { Component } from '@angular/core';
import { ToastController, NavController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { SignUpPage } from '../signup/signup.component';
import { ViewTasksPage } from '../task/view-tasks.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'signin',
  templateUrl: 'signin.component.html'
})
export class SignInPage {

    signInForm : FormGroup;

    constructor(public toastCtrl: ToastController, public navCtrl: NavController,
        public authService: AuthService, public fb: FormBuilder, public storage: Storage) {
        this.signInForm = this.fb.group({  
            'username': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
        });
    }

    signin() {
        const user = this.signInForm.value;
        this.authService.login(user)
            .subscribe((response: any) => {
                if(response.status == 200) {
                    const token = btoa( user.username+ ':' + user.password);
                    this.authService.setToken(token);
                    this.navCtrl.setRoot(ViewTasksPage);
                    this.storage.set('user', JSON.stringify(user));
                } else {
                    let toast = this.toastCtrl.create({
                        message: 'Sign In failed',
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                }
            });    
    }

    loadSignUpPage() {
        this.navCtrl.setRoot(SignUpPage);
    }

}