import { Component, inject, input } from '@angular/core';
import { BlogpostService } from '../../blogpost/services/blogpost-service';
import { RouterLink } from "@angular/router";
import { DatePipe } from '@angular/common';
import { MarkdownComponent } from "ngx-markdown";

@Component({
  selector: 'app-blog-details',
  imports: [DatePipe, MarkdownComponent],
  templateUrl: './blog-details.html',
  styleUrl: './blog-details.css',
})
export class BlogDetails {
  url = input<string | undefined>();
  blogPostService = inject(BlogpostService);

  blogPostRef = this.blogPostService.getBlogPostByUrlHandle(this.url);
  isLoading = this.blogPostRef.isLoading;
  blogDetailsRef = this.blogPostRef.value;

}
