
import {Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { AuthService } from 'src/app/servicios/auth.service';
import { StorageService } from 'src/app/servicios/storage.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations:[
    trigger(
      'inOutAnimation', 
      [ transition('void => *',  [
            style({transform: 'translateY(100%)', opacity: 0 }),
            animate('750ms ease-out', 
              style({ transform: 'translateY(0%)', opacity: 1 }))
        ]),
        transition('* => void', [
            style({ transform: 'translateY(0%)', opacity: 1 }),
            animate('500ms ease-in', 
              style({ transform: 'translateY(100%)', opacity: 0 }))
        ])
      ],
      
    )
  ]
})


export class RegisterComponent implements OnInit {

  mensajeError=null
  tipoform:string=''
  mostrarFormularios=false
  centradoForm:string;
  desdeDonde:string;

  constructor(private route:Router,
    private authService:AuthService,
    private storageService:StorageService) {
      this.desdeDonde=route.url
      switch(this.desdeDonde){
        case "/usuarios":
          this.centradoForm="col-lg-12"
          break;
        case "/sesion/register":
          this.centradoForm="col-lg-4"
          break;
      }
  }

  ngOnInit(): void {

  }

  dataUsuario(user){
    this.storageService.tareaCloudStorage(user.img,user.email).subscribe(x => {user.img=x
      })
    if(user.img2){
      this.storageService.tareaCloudStorage(user.img2,user.email).subscribe(x => user.img2=x)
    }
    
    let respuesta=this.authService.register(user)
      respuesta.then(x => {
        if(x.message){
          this.mensajeError=x.message
        }else{
          this.mensajeError=null
          delete user.pass;
          this.authService.create(user)
          this.route.navigate(['sesion/verifica-email'])
        }
      })
  }
  volverRegistros(volver){
    this.mostrarFormularios=volver
  }
  mostrarForm(tipo){
    this.tipoform=tipo
    this.mostrarFormularios=true
  }


}
