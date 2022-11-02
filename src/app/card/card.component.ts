import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  itemsCount = 0;
  cartItemsList: any[] = [];
  @Input() list: any;
  @Output() addItemEvent = new EventEmitter();
  updatedList: any[] | undefined;
  getStoredValues: any;

  /**
   * checks for the previous cart items if exists add the current list to the existing cart list
   * else creates new cart list
   * @param list : user requested list items
   */
  addItemToCart(list: any) {

    if (localStorage.getItem('ItemsInCart') !== null) {
      this.getStoredValues = JSON.parse(localStorage.getItem('ItemsInCart') || '');
      this.cartItemsList = this.getStoredValues;
      this.cartItemsList?.push(list);
    } else {
      this.cartItemsList?.push(list);
    }

    // setting updated cart items to local storage in browser
    localStorage.setItem('ItemsInCart', JSON.stringify(this.addCountValueToExistingList(this.cartItemsList)));

    // event to pass data to cards component
    this.addItemEvent.emit('data');
  }

  /**
   * adds count key values to the existing list 
   * removes duplicates from the list items and modifies the cost and count values of the list objects 
   * @param list : Updated list of the cart
   * @returns updated cart list with count key value
   */
  addCountValueToExistingList(list: any[]) {

    this.updatedList = Object.values(list.reduce(
      (map, el) => {
        map[el.name] ? (el.count? map[el.name].count += el.count : map[el.name].count++) : map[el.name] = {
          ...el,
          count: el.count ? el.count : 1
        };
        return map;
      }, {}
    ));

    return this.updatedList;
  }
}
