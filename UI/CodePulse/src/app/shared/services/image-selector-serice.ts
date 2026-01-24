import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BlogImage, UploadImageRequest } from '../models/image-selector.model';
import { Observable } from 'rxjs';
import { HttpClient, httpResource } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageSelectorSerice {
  http = inject(HttpClient);
  showImageSelector = signal<boolean>(false);
  selectedImage = signal<string | null>(null);

  displayImageSelector(){
    this.showImageSelector.set(true);
  }

  hideImageSelector(){
    this.showImageSelector.set(false);
  }

  uploadImageSelector(model: UploadImageRequest): Observable<BlogImage>{

    const formData = new FormData();
      formData.append('File',model.file);
      formData.append('Name',model.name);
      formData.append('Title',model.title);

    return this.http.post<BlogImage>(`${environment.baseApiUrl}/api/images`, formData);
  }

  getAllImagesSelector(id:WritableSignal<string | undefined>)
  {
    return httpResource<BlogImage[]>(()=>{
        id();
        return `${environment.baseApiUrl}/api/Images`
      }); 
  }

  selectImage(imageUrl:string){
    this.selectedImage.set(imageUrl);
    this.hideImageSelector();
  }
}
