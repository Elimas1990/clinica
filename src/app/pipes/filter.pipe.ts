import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], profesional: string): any[] {
    
    if(!items) return [];
    if(!profesional) return items;
    
    //especialidad = especialidad?.toLowerCase();
    profesional = profesional?.toLowerCase();
    
    
    

    return items.filter( it => {
      let check
      if(it.historia){
        let data=Object.keys(it.historia)
        check = data.filter(function(item) {
          return item.includes(profesional)
        })
      }
      
      
      if(it.nombreProf.toLowerCase().includes(profesional) 
      || it.apellidoProf.toLowerCase().includes(profesional)
      || it.especialidad?.toLowerCase().includes(profesional)
      || it.apellidoPaciente?.toLowerCase().includes(profesional)
      || it.nombrePaciente?.toLowerCase().includes(profesional)
      || it.estado?.toLowerCase().includes(profesional)
      || it.duracion?.toLowerCase().includes(profesional)
      || it.historia?.presion ==profesional
      || it.historia?.temp ==profesional
      || it.historia?.peso ==profesional
      || it.historia?.altura ==profesional
      || it.estado?.toLowerCase().includes(profesional)
      //|| check
      || moment(it.fecha.toDate()).format('DD/MM/YYYY HH:mm').toString().includes(profesional)){
        return it
      }
      //return it.nombre.toLowerCase().includes(profesional);
     
    });
    

    
  
  }

}
