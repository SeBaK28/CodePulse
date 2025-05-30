import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { nextTick } from 'process';
import { response } from 'express';

@Component({
  selector: 'app-add-blogpost',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent {

  model: AddBlogPost;

  constructor(private blogPostService: BlogPostService,
    private route : Router){
    this.model = {
      title: '',
      shortDescription: '',
      content: '',
      featuredImageURL: '',
      urlHandle: '',
      createdAt: new Date(),
      author: '',
      isVisible: true
    }
  }


  onFormSubmit(): void{
    this.blogPostService.createBlogPost(this.model)
    .subscribe({
      next: (response) =>{
        this.route.navigateByUrl('/admin/blogpost');
      }
    });
  }
}
