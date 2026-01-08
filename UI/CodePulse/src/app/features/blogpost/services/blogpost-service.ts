import { HttpClient, HttpRequest, httpResource, HttpResourceRef } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AddBlogPostRequest, BlogPostModel } from '../models/blogpost.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogpostService {

  private http = inject(HttpClient);
  private baseApiUrl = environment.baseApiUrl;
  public addBlogPostSignal = signal<'idle' | 'loading' | 'error' | 'success'>('idle');
  
  createBlogPost(blogpost: AddBlogPostRequest): Observable<BlogPostModel>{
    return this.http.post<BlogPostModel>(`${this.baseApiUrl}/api/blogPost`, blogpost);
  }

  getAllBlogPosts():HttpResourceRef<BlogPostModel[] | undefined>{
    return httpResource<BlogPostModel[]>(()=> `${this.baseApiUrl}/api/blogPost`);
  }
}
