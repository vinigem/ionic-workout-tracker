import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs/Rx';


const GET_ALL_WORKOUTS_SERVICE_URL = 'https://workout-tracker-server.herokuapp.com/view-workouts';
const SAVE_WORKOUT_SERVICE_URL = 'https://workout-tracker-server.herokuapp.com/save-workoutconst';
const GET_TRACK_DATA = 'https://workout-tracker-server.herokuapp.com/get-workout-track-data';

@Injectable()
export class WorkoutService {

    constructor(public httpClient: HttpClient) { }

    getWorkouts(): Observable<any> {
        return this.httpClient.get(GET_ALL_WORKOUTS_SERVICE_URL);
    }

    saveWorkout(workout: any): Observable<any> {
        return this.httpClient.post(SAVE_WORKOUT_SERVICE_URL, workout);
    }

    getTrackData() : Observable<any> {
        return this.httpClient.get(GET_TRACK_DATA);   
    }

}