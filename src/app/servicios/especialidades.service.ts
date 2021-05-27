import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  dbpath:string='/especialidades'
  dataEspecialidades:AngularFirestoreCollection<any>;
  especialidades: Observable<any>
  constructor(public db: AngularFirestore) { 
    this.dataEspecialidades=db.collection<any>(this.dbpath)
    this.especialidades = this.dataEspecialidades.valueChanges()
  }
  getAll(){
    return this.especialidades;
  }
}
