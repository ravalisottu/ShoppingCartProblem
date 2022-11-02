import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  itemsCount: number = 0;
  totalAmount: number = 0;

  constructor(
    private dataService: DataService
  ) {
    //updating local storage values when total amount and total cost is changed
    this.dataService.SharingData.subscribe((res: any) => {
      this.itemsCount = JSON.parse(localStorage.getItem('totalCount') || '0');
      this.totalAmount = JSON.parse(localStorage.getItem('totalAmount') || '0');
    });
  }

  ngOnInit(): void {
    // initilizing the header count and amount feilds based on localstorage values
    if (localStorage.getItem('totalCount') !== null) {
      this.itemsCount = JSON.parse(localStorage.getItem('totalCount') || '0');
    }
    if (localStorage.getItem('totalAmount') !== null) {
      this.totalAmount = JSON.parse(localStorage.getItem('totalAmount') || '0');
    }
  }

}
