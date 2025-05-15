import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnDestroy {

  model: AddCategoryRequest;
  private addCategorySubscription?: Subscription;

  constructor(private categoryService: CategoryService) {
    this.model = {
      name: "",
      urlHandle: "",
    }
  }

  onFormSubmit() {
    this.addCategorySubscription = this.categoryService.addCategory(this.model)
      .subscribe({
        next: (response) => {
          console.log("Succesful");
        }
      })
  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }

}
