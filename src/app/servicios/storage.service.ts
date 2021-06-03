import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(public storage:AngularFireStorage) { }

  filePath:any
  public tareaCloudStorage(img,usuario) {
    this.filePath=`image/${usuario}/${img.name}`
    const ref=this.storage.ref(this.filePath);
    const upload=this.storage.upload(this.filePath,img);
    return ref.getDownloadURL()
    
    /*upload.snapshotChanges()
      .pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(urlImage => {
            return urlImage
          });
        })
      ).subscribe();*/
  }

  //Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }



 
}
