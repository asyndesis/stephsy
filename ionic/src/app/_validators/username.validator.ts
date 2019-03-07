//I will need this eventually... But first have to build it on the back end. :)
//maybe utilize the fridgepoet room-generator for this.. :)
//Also, need to figure out how ot build a service that autochecks availability.
//Might be a good use of socket.io?  We'll see...

import { FormControl } from '@angular/forms';
export class UsernameValidator {
  static validUsername(fc: FormControl){
    if(fc.value.toLowerCase() === "abc123" || fc.value.toLowerCase() === "123abc"){
      return ({validUsername: true});
    } else {
      return (null);
    }
  }
}