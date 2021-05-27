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
    console.log(ref)
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

  storageRef
  public downImg(){
    let ref = this.storage.ref('image/DSC_0002.JPG');
    //ref.getDownloadURL().subscribe(url => console.log(url) );
  }
}