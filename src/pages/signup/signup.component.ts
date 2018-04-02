import { Component } from '@angular/core';
import { ToastController, NavController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { SignInPage } from '../signin/signin.component';
import { ViewTasksPage } from '../task/view-tasks.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'signup',
  templateUrl: 'signup.component.html'
})
export class SignUpPage {

    signUpForm : FormGroup;

    constructor(public toastCtrl: ToastController, public navCtrl: NavController,
        public authService: AuthService, public fb: FormBuilder) {
        this.signUpForm = this.fb.group({  
            'name': ['', Validators.required],
            'email': ['', Validators.compose([Validators.required, Validators.email])],
            'username': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
        });
    }

    signup() {
        const user = this.signUpForm.value;
        this.authService.register(user)
            .subscribe((user) => {
                if(user) {
                    const token = btoa( user.username+ ':' + user.password);
                    this.authService.setToken(token);
                    this.navCtrl.setRoot(ViewTasksPage);
                } else {
                    let toast = this.toastCtrl.create({
                        message: 'Sign Up failed',
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                }
            });    
    }

    loadSignInPage() {
        this.navCtrl.setRoot(SignInPage);
    }

}