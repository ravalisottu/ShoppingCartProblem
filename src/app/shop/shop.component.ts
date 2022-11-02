import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
    products: any;
    productsInCart: any;

    // injecting Data service
    constructor(
        private dataService: DataService
    ) {
        // Creating cards JSON Object
        this.products = [
            {
                'imageUrl': 'assets/images/circles-1605645460.svg',
                'name': 'Circle',
                'cost': 444
            },
            {
                'imageUrl': 'assets/images/squiggles-1605645292.svg',
                'name': 'Squiggles',
                'cost': 144
            },
            {
                'imageUrl': 'assets/images/rectangles-1605650080.svg',
                'name': 'Rectangles',
                'cost': 344
            },
            {
                'imageUrl': 'assets/images/shards-1605645306.svg',
                'name': 'Shards',
                'cost': 445
            },
            {
                'imageUrl': 'assets/images/labyrinth-1605645322.svg',
                'name': 'Labyrinth',
                'cost': 489
            }
        ];
    }

    addItem(event: any) {

        if (event) {

            this.productsInCart = JSON.parse(localStorage.getItem('ItemsInCart') || '{}');

            // adding all count values into an array to get total count
            const valuesList = this.productsInCart.map((i: { count: any; }) => i.count);
            const count = valuesList.reduce((accumulator: any, values: any) => {
                return accumulator + values;
            }, 0);

            console.log(count);
            // adding all cost values into an array to get total amount/cost
            const priceList = this.productsInCart.map((i: { cost: number; count: number; }) => i.cost * i.count);
            const cost = priceList.reduce((accumulator: any, values: any) => {
                return accumulator + values;
            }, 0);

            // storing total count and total cost values to local storage 
            localStorage.setItem('totalCount', count);
            localStorage.setItem('totalAmount', cost);

            // sending event to header componet to update the count and total cost value
            this.dataService.SharingData.next(count);
        }

    }

}
