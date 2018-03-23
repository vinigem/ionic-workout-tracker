import { Component, OnInit } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'add-category',
  templateUrl: 'add-category.component.html'
})
export class AddCategoryPage implements OnInit {

  categories: Array<any>;
  filteredCategories: Array<any>;
  newCategory: string;
  searchString: string = '';

  constructor(private categoryService: CategoryService, private toastCtrl: ToastController) {}

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
      name: this.newCategory
    }
    this.categoryService.saveCategory(category)
      .subscribe((status: boolean) => {
        let message: string;
        if(status) {
          message = 'Category saved successfully';
          this.loadCategories();
        } else {
          message = 'Category was not saved';
        }
        let toast = this.toastCtrl.create({
          message: message,
          duration: 3000
        });
        toast.present(); 
        this.newCategory = null;
      });    
  }

  update(category: any) {
    this.categoryService.saveCategory(category)
      .subscribe((status: boolean) => {
        let message: string;
        if(status) {
          message = 'Category updated successfully';
          this.loadCategories();
        } else {
          message = 'Category was not updated';
        }
        let toast = this.toastCtrl.create({
          message: message,
          duration: 3000
        });
        toast.present(); 
      });  
  }

  delete(category: any, index: number) {
    this.categoryService.deleteCategory(category.id)
      .subscribe((status: boolean) => {
        let message: string;
        if(status) {
          message = 'Category deleted successfully';
          this.loadCategories();
        } else {
          message = 'Category was not deleted';
        }
        let toast = this.toastCtrl.create({
          message: message,
          duration: 3000
        });
        toast.present(); 
      });  
  }

}
