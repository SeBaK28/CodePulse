import { Component, inject } from '@angular/core';
import { ImageSelectorSerice } from '../../services/image-selector-serice';
import { FormControl, FormGroup, MinLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { UploadImageRequest } from '../../models/imgae-selector.model';

@Component({
  selector: 'app-image-selector',
  imports: [ReactiveFormsModule],
  templateUrl: './image-selector.html',
  styleUrl: './image-selector.css',
})
export class ImageSelector {
  imageSelectorService = inject(ImageSelectorSerice);

  showImageSelector = this.imageSelectorService.showImageSelector.asReadonly();

   imageSelectorUploadForm = new FormGroup({
    file: new FormControl<File | null | undefined>(null, {
      nonNullable: true,validators: [Validators.required]
    }),
    name: new FormControl<string>("",{
      nonNullable: true,validators: [Validators.required, Validators.maxLength(100)]
    }),
    title: new FormControl<string>("",{
      nonNullable: true,validators: [Validators.required, Validators.maxLength(100)]
    }), 
   })

  hideImageSelector(){
    this.imageSelectorService.hideImageSelector();
  } 

  onSubmit(){
    if(this.imageSelectorUploadForm.valid){
      const formRowValue = this.imageSelectorUploadForm.getRawValue();
      console.log(formRowValue);

      const requestDto: UploadImageRequest={
        file: formRowValue.file!,
        name: formRowValue.name,
        title: formRowValue.title
      }

      this.imageSelectorService.uploadImageSelector(requestDto).subscribe({
        next:(response)=>{
          console.log(response);
        },
        error: ()=>{
          console.error("Something went worng!");
        }
      })
    }
  }
    
}
