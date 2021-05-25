import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  data=JSON.parse(localStorage.getItem('user'))

  constructor(private authService:AuthService,
    private storageService:StorageService) {
    storageService.storage.ref(this.data.img).getDownloadURL().subscribe(x => this.data.img=x);
    if(this.data.img2){
      storageService.storage.ref(this.data.img2).getDownloadURL().subscribe(x => this.data.img2=x);
    }
  }

  ngOnInit(): void {
  }

}
