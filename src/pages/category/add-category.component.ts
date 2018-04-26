import { Component, OnInit } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

import { CategoryService } from '../../services/category.service';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'add-category',
  templateUrl: 'add-category.component.html'
})
export class AddCategoryPage implements OnInit {

  categories: Array<any>;
  filteredCategories: Array<any>;
  newCategory: string;
  searchString: string = '';

  constructor(public categoryService: CategoryService, public messageService: MessageService,
   public navCtrl: NavController, public authService: AuthService, public events: Events) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories()
      .subscribe((data: Array<any>) => {
        this.categories = data;
        this.filteredCategories = data;  
      });
  }

  setFilteredItems() {
    this.filteredCategories = this.categories.filter((category: any) => {
      return category.name.toLowerCase().indexOf(this.searchString.toLowerCase()) != -1;
    });
  }

  save() {
    const category = {
      name: this.newCategory,
      user: this.authService.getUsername()
    }
    this.categoryService.saveCategory(category)
      .subscribe((status: string) => {
        let message: string;
        if(status == 'SUCCESS') {
          message = 'Category saved successfully';
          this.loadCategories();
          this.events.publish('categoryModified');
        } else if(status == 'ERROR') {
          message = 'Category was not saved';
        } else if(status == 'EXIST') {
          message = 'Category already exist';
        }
        this.messageService.showMessage(message); 
        this.newCategory = null;
      });    
  }

  update(category: any) {
    this.categoryService.saveCategory(category)
      .subscribe((status: string) => {
        let message: string;
        if(status == 'SUCCESS') {
          message = 'Category updated successfully';
          this.loadCategories();
          this.events.publish('categoryModified');
        } else if( status == 'ERROR') {
          message = 'Category was not updated';
        }
        this.messageService.showMessage(message); 
      });  
  }

  delete(category: any, index: number) {
    this.categoryService.deleteCategory(category.id)
      .subscribe((status: boolean) => {
        let message: string;
        if(status) {
          message = 'Category deleted successfully';
          this.loadCategories();
          this.events.publish('categoryModified');
        } else {
          message = 'Category was not deleted';
        }
        this.messageService.showMessage(message); 
      });  
  }

  goBack() {
    this.navCtrl.pop();
  }

}