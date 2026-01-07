import { Component, effect, inject, input } from '@angular/core';
import { CategoryService } from '../services/category-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateCategory } from '../models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.css',
})
export class EditCategory {
    constructor(){
    effect(()=> {
      if(this.categoryService.updateCategoryStatus() === 'success'){
        this.categoryService.updateCategoryStatus.set('idle');
        this.route.navigate(['/admin/categories']);
      }
      if(this.categoryService.updateCategoryStatus() === 'error'){
        alert('Update Category Request Failed');
      }
    })
  }

  id = input<string>();
  private categoryService = inject(CategoryService);
  private route = inject(Router);
  categoryResourceRef = this.categoryService.getById(this.id);
  categoryResponse = this.categoryResourceRef.value;

  editCategoryFormGroup = new FormGroup({
    name: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.maxLength(100)]}),
    urlHandle: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.maxLength(100)]})
  })

  get nameFormControl(){
    return this.editCategoryFormGroup.controls.name;
  }

  get urlHandleFormControl(){
    return this.editCategoryFormGroup.controls.urlHandle;
  }

  effectRef = effect(()=>{
    this.editCategoryFormGroup.controls.name.patchValue(this.categoryResponse()?.name ?? '');
    this.editCategoryFormGroup.controls.urlHandle.patchValue(this.categoryResponse()?.urlHandle ?? '');
  })

  onSubmit(){
    const id = this.id();
    if(!this.editCategoryFormGroup.valid || !id){
      return;
    }

    const formRowValue = this.editCategoryFormGroup.getRawValue();
    const updateCategoryRequestDto: UpdateCategory = {
      name: formRowValue.name,
      urlHandle: formRowValue.urlHandle
    }

    this.categoryService.updateCategory(id, updateCategoryRequestDto);
  }

  deleteCategory(){
    const id = this.id();
    if(!id){
      return;
    }

    this.categoryService.deleteCategory(id).subscribe({
      next:()=>{
        this.route.navigate(['/admin/categories']);
      },
      error:()=>{
        alert("Something went wrong");
      }
    });
  }
}
