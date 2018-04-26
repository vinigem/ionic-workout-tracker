import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { SignInPage } from '../signin/signin.component';
import { ViewTasksPage } from '../task/view-tasks.component';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'signup',
  templateUrl: 'signup.component.html'
})
export class SignUpPage {

    signUpForm : FormGroup;

    constructor(public messageService: MessageService, public navCtrl: NavController,
        public authService: AuthService, public fb: FormBuilder, public storage: Storage) {
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
                    this.authService.setUserToken(user);
                    this.navCtrl.setRoot(ViewTasksPage);
                     this.storage.set('user', JSON.stringify(user));
                } else {
                    this.messageService.showMessage('Sign Up failed');
                }
            });    
    }

    loadSignInPage() {
        this.navCtrl.setRoot(SignInPage);
    }

}