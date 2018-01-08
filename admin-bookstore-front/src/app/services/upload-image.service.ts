import { Injectable } from '@angular/core';

@Injectable()
export class UploadImageService {

  filesToUpload: Array<File>;

  constructor() { }

  upload(bookId: number) {
   this.makeFileRequest('http://localhost:8181/book/image/upload?id=' + bookId, [], this.filesToUpload).then(result => {
     console.log(result);
   },
     error => {
     console.log(error);
   });
  }

  uploadWhenModified(bookId: number) {
    if (this.filesToUpload.length > 0) {
      this.upload(bookId);
    }
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>> fileInput.target.files;
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();
      for (let i = 0; i < files.length ; i++) {
        formData.append('uploads[]', files[i], files[i].name);
      }
      xhr.onreadystatechange = function(){
        if ( xhr.readyState === 4 ) {
          if ( xhr.status === 200 ) {
            console.log('image uploaded sucessfully');
          }else {
            reject(xhr.response);
          }
        }
      };
      xhr.open('POST', url, true);
      xhr.setRequestHeader('x-auth-token', localStorage.getItem('xAuthToken'));
      xhr.send(formData);
    });
  }


}
