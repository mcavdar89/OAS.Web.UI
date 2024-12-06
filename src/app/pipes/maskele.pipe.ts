import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskele'
})
export class MaskelePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (!value) {
      return;
    }

    let list = value.split(' ');
    for (let i = 0; i < list.length; i++) {

      let valuLength = list[i]!.toString().length;
      let arg0 = (args[0] as number) ?? 1;
      let arg1 = (args[1] as string) ?? '*';

      let index = list[i]!.length > arg0 ? arg0 : list[i]!.length;     

      for (let j = index; j < valuLength; j++) {
        list[i] = list[i]!.toString().replace(list[i]!.toString().charAt(j), arg1);
      }
      
    }

    return list.join(' ');




    return null;
  }

}
