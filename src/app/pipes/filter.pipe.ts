import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], profesional: string): any[] {
    console.log(profesional)
    if(!items) return [];
    if(!profesional) return items;
    
    //especialidad = especialidad?.toLowerCase();
    profesional = profesional?.toLowerCase();
    
    


    return items.filter( it => {
      console.log(it)
      if(it.nombreProf.toLowerCase().includes(profesional) 
      || it.apellidoProf.toLowerCase().includes(profesional)
      || it.especialidad?.toLowerCase().includes(profesional)){
        return it
      }
      //return it.nombre.toLowerCase().includes(profesional);
     
    });
    

    
  
  }

}
