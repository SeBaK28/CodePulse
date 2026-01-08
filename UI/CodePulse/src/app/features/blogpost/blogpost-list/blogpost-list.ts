import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { BlogpostService } from '../services/blogpost-service';

@Component({
  selector: 'app-blogpost-list',
  imports: [RouterLink],
  templateUrl: './blogpost-list.html',
  styleUrl: './blogpost-list.css',
})
export class BlogpostList {
  blogPostService = inject(BlogpostService);

  getAllBlogPostService = this.blogPostService.getAllBlogPosts();

  isLoading = this.getAllBlogPostService.isLoading;
  isError = this.getAllBlogPostService.error;
  value = this.getAllBlogPostService.value;
  statusCode = this.getAllBlogPostService.statusCode;
}
