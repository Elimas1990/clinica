import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  data:any
  showImg:boolean=false
  
  constructor(private authService:AuthService,
    private storageService:StorageService) {
    this.authService.auth.user.subscribe(x=> {
      if(x){
        this.authService.db.collection('/usuarios', ref => ref.where('email','==', x.email ))
          .valueChanges()
          .subscribe((response) => {
            this.data=response[0]
            storageService.storage.ref(this.data.img).getDownloadURL().subscribe(x => this.data.img=x);
            if(this.data.img2){
              storageService.storage.ref(this.data.img2).getDownloadURL().subscribe(x => this.data.img2=x);
            }
            this.showImg=true
        });
      }
    })
    
  }



  ngOnInit(): void {
  }

}
