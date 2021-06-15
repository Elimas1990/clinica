import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceArray'
})
export class SliceArrayPipe implements PipeTransform {

  transform(value: Array<any>, ...args: unknown[]): unknown {
    if(value){
      return value.join(", ");
    }else{
      return null
    }
    //value.join()
    
  }

}
