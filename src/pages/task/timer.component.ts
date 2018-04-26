import { Component, OnDestroy } from '@angular/core';
import { Events } from 'ionic-angular';

@Component({
  selector: 'timer',
  template: `
    <div class="timer-modal" *ngIf="show">
        <div class="timer-content">
            <div class="timer">
                <h1>{{timer}}</h1>
            </div>
        
            <button ion-button color="danger" (click)="stopTimer();">
                <ion-icon name='stopwatch'></ion-icon>&nbsp; Stop
            </button>
        </div>
    </div>
    <div class="modal-overlay" *ngIf="show">   
  `
})
export class Timer implements OnDestroy {
    
    timer: string;
    timerTask: any;
    show: boolean;
    workout: any;
            
    constructor(public events: Events) {
        events.subscribe('showTimer', (workout: any) => {
            this.workout = workout;
            this.startTimer(workout.startTime);
            this.show = true;
            this.timerTask = setInterval(() => {
                this.startTimer(workout.startTime);
            }, 1000);
        });
    }
   
    startTimer(startTime: any) {
        const currTime: any = new Date();
        const seconds = (currTime - startTime) / 1000;
        const numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
        const numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
        const numseconds = Math.floor((((seconds % 31536000) % 86400) % 3600) % 60);
        this.timer = ((numhours<10) ? "0" + numhours : numhours)
            + ":" + ((numminutes<10) ? "0" + numminutes : numminutes)
            + ":" + ((numseconds<10) ? "0" + numseconds : numseconds);
    }

    stopTimer() {
        clearInterval(this.timerTask);
        this.show = false;
        this.workout.endTime = new Date();
        this.events.publish('stoppedTimer', this.workout);
        this.workout = null;
    }

    ngOnDestroy() {
        this.events.unsubscribe('showTimer');
    }
     
}
