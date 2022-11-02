import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Multicasting the updated value to the subscribed header componet
  SharingData = new Subject();  

}
