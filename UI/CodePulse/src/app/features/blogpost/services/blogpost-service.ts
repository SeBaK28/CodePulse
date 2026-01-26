import { HttpClient, HttpRequest, httpResource, HttpResourceRef } from '@angular/common/http';
import { inject, Injectable, InputSignal, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AddBlogPostRequest, BlogPostModel, UpdateBlogPost } from '../models/blogpost.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogpostService {

  private http = inject(HttpClient);
  private baseApiUrl = environment.baseApiUrl;
  public addBlogPostSignal = signal<'idle' | 'loading' | 'error' | 'success'>('idle');
  public updateBlogPostSignal = signal<'idle' | 'loading' | 'error' | 'success'>('idle');
  
  createBlogPost(blogpost: AddBlogPostRequest): Observable<BlogPostModel>{
    return this.http.post<BlogPostModel>(`${this.baseApiUrl}/api/blogPost`, blogpost);
  }

  getAllBlogPosts():HttpResourceRef<BlogPostModel[] | undefined>{
    return httpResource<BlogPostModel[]>(()=> `${this.baseApiUrl}/api/blogPost`);
  }

  getBlogPostById(id:InputSignal<string | undefined>): HttpResourceRef<BlogPostModel | undefined>{
    return httpResource<BlogPostModel>(()=> `${this.baseApiUrl}/api/blogPost/${id()}`);
  }

  getBlogPostByUrlHandle(urlHandle:InputSignal<string | undefined>): HttpResourceRef<BlogPostModel | undefined>{
    return httpResource<BlogPostModel>(()=> `${environment.baseApiUrl}/api/blogPost/${urlHandle()}`);
  }

  updateBlogPost(id: string ,blogPost: UpdateBlogPost): Observable<BlogPostModel>{
    //this.updateBlogPostSignal.set('loading');
    return this.http.put<BlogPostModel>(`${this.baseApiUrl}/api/blogPost/${id}`, blogPost)//
  }

  deleteBlogPost(id: string): Observable<void>{
    return this.http.delete<void>(`${this.baseApiUrl}/api/blogPost/${id}`)
  }
}
