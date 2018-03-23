import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs/Rx';

const GET_ALL_CATEGORIES_SERVICE_URL = 'https://workout-tracker-server.herokuapp.com/view-categories';
const SAVE_CATEGORY_SERVICE_URL = 'https://workout-tracker-server.herokuapp.com/save-category';
const DELETE_CATEGORY_SERVICE_URL = 'https://workout-tracker-server.herokuapp.com/delete-category';

@Injectable()
export class CategoryService {

    constructor(private httpClient: HttpClient) {}

    getCategories(): Observable<any> {
        return this.httpClient.get(GET_ALL_CATEGORIES_SERVICE_URL);
    }

    saveCategory(category: any): Observable<any> {
        return this.httpClient.post(SAVE_CATEGORY_SERVICE_URL, category);
    }

    deleteCategory(categoryName: any): Observable<any> {
        return this.httpClient.post(DELETE_CATEGORY_SERVICE_URL, categoryName);
    }

}