import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AddCategoryRequest } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private baseApiUrl = 'http://localhost:5013';

  public addCategoryStatus = signal<'idle' | 'loading' | 'error' | 'success'>('idle');

  addCategory(category: AddCategoryRequest){
    this.http.post<void>(`${this.baseApiUrl}/api/categories`,category).subscribe({
      next:()=>{
        this.addCategoryStatus.set('success');
      },
      error:()=>{
        this.addCategoryStatus.set('error');
      }
    })
  }
  
}
