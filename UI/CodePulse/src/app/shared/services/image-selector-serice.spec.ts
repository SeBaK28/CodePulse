import { TestBed } from '@angular/core/testing';

import { ImageSelectorSerice } from './image-selector-serice';

describe('ImageSelectorSerice', () => {
  let service: ImageSelectorSerice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageSelectorSerice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
