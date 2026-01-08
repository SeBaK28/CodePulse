import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogpostService } from '../services/blogpost-service';
import { AddBlogPostRequest } from '../models/blogpost.model';
import { Router } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-add-blogpost',
  imports: [ReactiveFormsModule, MarkdownComponent ],
  templateUrl: './add-blogpost.html',
  styleUrl: './add-blogpost.css',
})
export class AddBlogpost {

  blogPostService = inject(BlogpostService);
  route = inject(Router);

  addBlogPostForm= new FormGroup({
    title: new FormControl<string>('', {nonNullable:true,validators: [Validators.required,Validators.minLength(10),Validators.maxLength(100)]}),
    shortDescription: new FormControl<string>('', {nonNullable:true, validators: [Validators.required, Validators.minLength(10), Validators.maxLength(200)]}),
    content: new FormControl<string>('', {nonNullable:true, validators: [Validators.required, Validators.minLength(10), Validators.maxLength(5000)]}),
    featuredImageURL: new FormControl<string>('', {nonNullable:true, validators: [Validators.required, Validators.minLength(10), Validators.maxLength(100)]}),
    urlHandle: new FormControl<string>('', {nonNullable:true, validators: [Validators.required, Validators.minLength(10), Validators.maxLength(100)]}),
    author: new FormControl<string>('', {nonNullable:true, validators: [Validators.required, Validators.maxLength(100)]}),
    createdAt: new FormControl<string>(new Date().toISOString().split('T')[0], {nonNullable:true, validators: [Validators.required]}),
    isVisible: new FormControl<boolean>(true, {nonNullable:true}),
  })

  onSubmit(){
    const formRowValue = this.addBlogPostForm.getRawValue();

    const requestDto: AddBlogPostRequest={
      title: formRowValue.title,
      shortDescription: formRowValue.shortDescription,
      content: formRowValue.content,
      featuredImageURL: formRowValue.featuredImageURL,
      urlHandle: formRowValue.urlHandle,
      createdAt: new Date(formRowValue.createdAt),
      author: formRowValue.author,
      isVisible: formRowValue.isVisible
    }

    this.blogPostService.createBlogPost(requestDto).subscribe({
      next: ()=>{
        console.log(requestDto);
        this.route.navigate(['/admin/blogpost']);
      },
      error: ()=>{
        console.log("Something went wrong!");
      }
    });
  }
}
