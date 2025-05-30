import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request.model';
import { response } from 'express';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit, OnDestroy{

  id: string|null = null;
  paramsSub?: Subscription;
  updateCategorySub?: Subscription;
  category?: Category;

  constructor(private route:ActivatedRoute,
    private  categoryService: CategoryService,
    private router: Router) {
    
  }

  ngOnInit(): void {
    this.paramsSub = this.route.paramMap.subscribe({
      next:(params) =>{
        this.id = params.get('id');

        if(this.id){
          this.categoryService.getByIdCategory(this.id)
          .subscribe({
            next: (response) =>{
              this.category = response; 
            }
          });
        }
      }
    })
  }

  onFormSubmit(): void{
    const updateCategoryRequest: UpdateCategoryRequest ={
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? ''
    }

    if(this.id){
      this.updateCategorySub =this.categoryService.updateCategory(this.id, updateCategoryRequest)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categories');
        }
      });
    }
  }

  onDelete(): void{
    if(this.id){
      this.categoryService.deleteCategory(this.id)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categories');
        }
      })

    }
  }

    ngOnDestroy(): void {
      this.paramsSub?.unsubscribe();
      this.updateCategorySub?.unsubscribe();
  }
}
