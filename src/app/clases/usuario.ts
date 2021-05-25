export class Usuario {
    nombre:string
    apellido:string
    edad:number
    dni:number
    email:string
    pass:string
    img:string
    estado:boolean
    tipouser:string
}

export class Paciente extends Usuario{
    obrasocial:string
    img2:string
}
export class Profesional extends Usuario{
    especialidad:Array<string>
    licencia:boolean
}

export class Admin extends Usuario{
}