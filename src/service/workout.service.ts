import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs/Rx';


const GET_ALL_WORKOUTS_SERVICE_URL = 'https://workout-tracker-server.herokuapp.com/view-workouts';
const SAVE_WORKOUT_SERVICE_URL = 'https://workout-tracker-server.herokuapp.com/save-workout';

@Injectable()
export class WorkoutService {

    constructor(private httpClient: HttpClient) { }

    getWorkouts(): Observable<any> {
        return this.httpClient.get(GET_ALL_WORKOUTS_SERVICE_URL);
    }

    saveWorkout(workout: any): Observable<any> {
        return this.httpClient.post(SAVE_WORKOUT_SERVICE_URL, workout);
    }

}