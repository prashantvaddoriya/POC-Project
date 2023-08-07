import { Pipe, PipeTransform } from '@angular/core';
import { Mycontact } from '../mycontact';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(value: Mycontact[], searchcontact: string): Mycontact[] {
    if (value.length === 0 && searchcontact == '') {
      return value;
    }
    const result = [];
    for (let contact of value) {
      debugger
      if (
        contact.contactName
          .toLocaleLowerCase()
          .match(searchcontact.toLocaleLowerCase())
      ) {
        result.push(contact);
      }
    }
    return result;
  }
}
