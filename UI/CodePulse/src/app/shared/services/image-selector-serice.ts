import { inject, Injectable, signal } from '@angular/core';
import { BlogImage, UploadImageRequest } from '../models/imgae-selector.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageSelectorSerice {
  http = inject(HttpClient);
  showImageSelector = signal<boolean>(false);

  displayImageSelector(){
    this.showImageSelector.set(true);
  }

  hideImageSelector(){
    this.showImageSelector.set(false);
  }

  uploadImageSelector(model: UploadImageRequest): Observable<BlogImage>{
    return this.http.post<BlogImage>(`${environment.baseApiUrl}/api/Images`, model);
  }
}
