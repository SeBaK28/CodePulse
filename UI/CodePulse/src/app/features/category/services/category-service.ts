import { HttpClient, httpResource } from '@angular/common/http';
import { effect, inject, Injectable, InputSignal, signal } from '@angular/core';
import { AddCategoryRequest, Category, UpdateCategory } from '../models/category.model';
import { environment } from '../../../../environments/environment';
import { EditCategory } from '../edit-category/edit-category';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {



  private http = inject(HttpClient);
  

  private baseApiUrl = environment.baseApiUrl;
  public addCategoryStatus = signal<'idle' | 'loading' | 'error' | 'success'>('idle');
  public updateCategoryStatus = signal<'idle' | 'loading' | 'error' | 'success'>('idle');


  addCategory(category: AddCategoryRequest){
    this.addCategoryStatus.set('loading');
    this.http.post<void>(`${this.baseApiUrl}/api/categories`,category).subscribe({
      next:()=>{
        this.addCategoryStatus.set('success');
      },
      error:()=>{
        this.addCategoryStatus.set('error');
      }
    })
  }

  getAllCategory(){
    return httpResource<Category[]>(()=> `${this.baseApiUrl}/api/categories/getAll`);
  }

  getById(id: InputSignal<string | undefined>){
    return httpResource<Category>(()=> `${this.baseApiUrl}/api/categories/${id()}`);
  }

  updateCategory(id: string, category: UpdateCategory){
    this.updateCategoryStatus.set('loading');
    this.http.put<void>(`${this.baseApiUrl}/api/categories/${id}`, category).subscribe({
      next: ()=>{
        this.updateCategoryStatus.set('success');
      },
      error: ()=>{
        this.updateCategoryStatus.set('error');
      }
    });
  }

  deleteCategory(id: string):Observable<void>{
    return this.http.delete<void>(`${this.baseApiUrl}/api/categories/${id}`);
  }
  
}
