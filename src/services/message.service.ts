import { Injectable } from '@angular/core';
import { ToastController} from 'ionic-angular';


@Injectable()
export class MessageService {

    constructor(public toastCtrl: ToastController) { }

    showMessage(message: string, time?: number, pos?: string) {
        let toast = this.toastCtrl.create({
          message: message,
          duration: time ? time : 5000,
          position: pos ? pos : 'top'
        });
        toast.present(); 
    }

}