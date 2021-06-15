import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userType'
})
export class UserTypePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    console.log(value)
    switch(value){
      case "Profesional":
      return `<span class="text-info bg-dark p-1 rounded">`+value+`</span>`;
      break;
      case "Paciente": 
      return `<span class="text-danger bg-dark p-1 rounded">`+value+`</span>`;
      break;
      case "Administrativo": 
      return `<span class="text-warning bg-dark p-1 rounded">`+value+`</span>`;
      break;
      default: 
      return null;
      break;
    }
    
  }

}
