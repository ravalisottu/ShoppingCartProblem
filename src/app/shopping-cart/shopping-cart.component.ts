import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

interface Transaction {
    imageUrl: string;
    cost: number;
    name: string;
    count: number;
    position: number
}

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

    /** Initilizing Table headers */
    displayedColumns: string[] = ['position', 'name', 'imageUrl', 'count', 'cost','plus', 'minus', 'columndelete'];
    transactions: Transaction[] = []; // Table Data Object

    /**  Injecting Service. */
    constructor(private dataService: DataService) { }

    /**  Initilizing table with cart values from localstorage. */
    ngOnInit() {
        this.transactions = JSON.parse(localStorage.getItem('ItemsInCart') || '{}');
    }

    /** Gets the total cost of all transactions. */
    getTotalCost() {
        return this.transactions.map(t => t.cost * t.count).reduce((acc, value) => acc + value, 0);
    }

    /**
     * called when user tries to delete the items in cart table
     * @param elm : user selected cart list/row
     */
    delete(elm: any) {
        this.transactions = this.transactions
            .filter(i => i !== elm)
            .map((i, idx) => (i.position = (idx + 1), i));

        localStorage.setItem('ItemsInCart', JSON.stringify(this.transactions));

        this.updateHeaderInfo();
    }

    updateHeaderInfo() {
        // adding all count values into an array to get total count
        const valuesList = this.transactions.map((i: { count: any; }) => i.count);
        const count = valuesList.reduce((accumulator: any, values: any) => {
            return accumulator + values;
        }, 0);

        // adding all cost values into an array to get total amount/cost
        const priceList = this.transactions.map((i) => i.cost * i.count);
        const cost = priceList.reduce((accumulator: any, values: any) => {
            return accumulator + values;
        }, 0);

        // storing total count and total cost values to local storage 
        localStorage.setItem('totalCount', count);
        localStorage.setItem('totalAmount', cost);

        // sending event to header componet to update the count and total cost value
        this.dataService.SharingData.next(count);
    }

    changeQty(transaction: any, addItem: boolean) {
        addItem ? transaction.count++ : transaction.count--;
        this.updateHeaderInfo();
    }

}
