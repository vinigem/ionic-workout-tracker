import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs/Rx';


const GET_ALL_TASKS_SERVICE_URL = 'https://workout-tracker-server.herokuapp.com/view-tasks';
const SAVE_TASK_SERVICE_URL = 'https://workout-tracker-server.herokuapp.com/save-task';
const DELETE_TASK_SERVICE_URL = 'https://workout-tracker-server.herokuapp.com/delete-task';

@Injectable()
export class TaskService {

    constructor(public httpClient: HttpClient) { }

    getTasks(): Observable<any> {
        return this.httpClient.get(GET_ALL_TASKS_SERVICE_URL);
    }

    saveTask(task: any): Observable<any> {
        return this.httpClient.post(SAVE_TASK_SERVICE_URL, task);
    }

    deleteTask(title: string): Observable<any> {
        return this.httpClient.post(DELETE_TASK_SERVICE_URL, title);
    }

}