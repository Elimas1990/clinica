import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], profesional: string): any[] {
    //console.log(profesional)
    if(!items) return [];
    if(!profesional) return items;
    
    //especialidad = especialidad?.toLowerCase();
    profesional = profesional?.toLowerCase();
    
    
    

    return items.filter( it => {
      if(it.nombreProf.toLowerCase().includes(profesional) 
      || it.apellidoProf.toLowerCase().includes(profesional)
      || it.especialidad?.toLowerCase().includes(profesional)
      || it.apellidoPaciente?.toLowerCase().includes(profesional)
      || it.nombrePaciente?.toLowerCase().includes(profesional)
      || it.estado?.toLowerCase().includes(profesional)
      || it.duracion?.toLowerCase().includes(profesional)
      || moment(it.fecha.toDate()).format('DD/MM/YYYY HH:mm').toString().includes(profesional)){
        return it
      }
      //return it.nombre.toLowerCase().includes(profesional);
     
    });
    

    
  
  }

}
