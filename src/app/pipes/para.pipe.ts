import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'para'
})
export class ParaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {

    if(args[0]=='tr'){
      return value + " ₺";
    }else if(args[0]=='us'){
      return value + " $";
    }else if(args[0]=='eu'){
      return value + " €";
    }




    return null;
  }

}
