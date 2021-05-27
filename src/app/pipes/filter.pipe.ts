import { Pipe, PipeTransform } from '@angular/core';

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
      console.log(it)
      if(it.nombre.toLowerCase().includes(profesional) 
      || it.apellido.toLowerCase().includes(profesional)
      || it.especialidad?.toLowerCase().includes(profesional)){
        return it
      }
      //return it.nombre.toLowerCase().includes(profesional);
     
    });
    

    
  
  }

}
