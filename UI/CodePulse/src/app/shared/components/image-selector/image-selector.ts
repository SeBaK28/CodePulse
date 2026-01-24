import { Component, inject, signal } from '@angular/core';
import { ImageSelectorSerice } from '../../services/image-selector-serice';
import { FormControl, FormGroup, MinLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogImage, UploadImageRequest } from '../../models/image-selector.model';

@Component({
  selector: 'app-image-selector',
  imports: [ReactiveFormsModule],
  templateUrl: './image-selector.html',
  styleUrl: './image-selector.css',
})
export class ImageSelector {
  imageSelectorService = inject(ImageSelectorSerice);
  showImageSelector = this.imageSelectorService.showImageSelector.asReadonly();
  id= signal<string | undefined>(undefined);
  imageRef = this.imageSelectorService.getAllImagesSelector(this.id);
  isLoading = this.imageRef.isLoading;
  images = this.imageRef.value;



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

  onFileSelected(event: Event){
    const input = event.target as HTMLInputElement;
    if(!input.files || input.files.length === 0){
      return;
    }

    const file = input.files[0];

    this.imageSelectorUploadForm.patchValue({
      file: file
    })
  }

  onSelectImage(image: BlogImage){
    this.imageSelectorService.selectImage(image.url);
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
          this.id.set(response.id); 
          this.imageSelectorUploadForm.reset();
        },
        error: ()=>{
          console.error("Sth went wrong");
        }
      })
    }
  }

    
}
