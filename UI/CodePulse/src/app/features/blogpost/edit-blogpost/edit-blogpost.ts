import { Component, effect, inject, input } from '@angular/core';
import { BlogpostService } from '../services/blogpost-service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category-service';
import { UpdateCategory } from '../../category/models/category.model';
import { UpdateBlogPost } from '../models/blogpost.model';
import { ConstantPool } from '@angular/compiler';
import { ImageSelector } from '../../../shared/components/image-selector/image-selector';
import { ImageSelectorSerice } from '../../../shared/services/image-selector-serice';

@Component({
  selector: 'app-edit-blogpost',
  imports: [ReactiveFormsModule, MarkdownComponent, ImageSelector],
  templateUrl: './edit-blogpost.html',
  styleUrl: './edit-blogpost.css',
})
export class EditBlogpost {
  id= input<string>();
  private blogPostService = inject(BlogpostService);
  private categoryService = inject(CategoryService);
  private imageService = inject(ImageSelectorSerice)
  private route = inject(Router);

  blogPostResourceRef = this.blogPostService.getBlogPostById(this.id);
  blogPostRef = this.blogPostResourceRef.value;
  categoryResourceRef = this.categoryService.getAllCategory();
  caregoriesResponse = this.categoryResourceRef.value;

   editBlogPostForm= new FormGroup({
    title: new FormControl<string>('', {nonNullable:true,validators: [Validators.required,Validators.minLength(10),Validators.maxLength(100)]}),
    shortDescription: new FormControl<string>('', {nonNullable:true, validators: [Validators.required, Validators.minLength(10), Validators.maxLength(200)]}),
    content: new FormControl<string>('', {nonNullable:true, validators: [Validators.required, Validators.minLength(10), Validators.maxLength(5000)]}),
    featuredImageURL: new FormControl<string>('', {nonNullable:true, validators: [Validators.required, Validators.minLength(10), Validators.maxLength(100)]}),
    urlHandle: new FormControl<string>('', {nonNullable:true, validators: [Validators.required, Validators.minLength(10), Validators.maxLength(100)]}),
    author: new FormControl<string>('', {nonNullable:true, validators: [Validators.required, Validators.maxLength(100)]}),
    createdAt: new FormControl<string>(new Date().toISOString().split('T')[0], {nonNullable:true, validators: [Validators.required]}),
    isVisible: new FormControl<boolean>(true, {nonNullable:true}),
    categories: new FormControl<string[]>([])
  })

  effectRef = effect(()=>{
    if(this.blogPostRef()){
      this.editBlogPostForm.patchValue({
        title: this.blogPostRef()?.title,
        shortDescription: this.blogPostRef()?.shortDescription,
        content: this.blogPostRef()?.content,
        featuredImageURL: this.blogPostRef()?.featuredImageURL,
        urlHandle: this.blogPostRef()?.urlHandle,
        createdAt: new Date(this.blogPostRef()?.createdAt!).toISOString().split('T')[0],
        author: this.blogPostRef()?.author,
        isVisible: this.blogPostRef()?.isVisible,
        categories: this.blogPostRef()?.categories.map(x=>x.id)
      })
    }
  })

  onSubmit(){
    const id = this.id();
    if(id && this.editBlogPostForm.value){

      const formRowValue = this.editBlogPostForm.getRawValue();
      
      const updateBlogPostRequestDto: UpdateBlogPost ={
        title: formRowValue.title,
        shortDescription: formRowValue.shortDescription,
        content: formRowValue.content,
        featuredImageURL: formRowValue.featuredImageURL,
        urlHandle: formRowValue.urlHandle,
        createdAt: new Date(formRowValue.createdAt),
        author: formRowValue.author,
        isVisible: formRowValue.isVisible,
        categories: formRowValue.categories?? [],
      }
      
      
      console.log(this.editBlogPostForm.getRawValue());
      this.blogPostService.updateBlogPost(id, updateBlogPostRequestDto)
      .subscribe({
      next: (response)=>{
        console.log(response);
        this.route.navigate(['/admin/blogpost'])
      },
      error: ()=>{
        console.error('Something went wrong!!!');
      }
    });
    }
  }

  DeleteBlogPost(){
    const id = this.id();
    if(!id){
      return;
    }

    this.blogPostService.deleteBlogPost(id).subscribe({
      next: () =>{
        this.route.navigate(['/admin/blogpost'])
      },
      error: () =>{
        alert("Sth went wrong");
      }
    })
  }

  openImageSelector(){
    this.imageService.displayImageSelector();
  }
  
  
}
