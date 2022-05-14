import { Injectable } from '@angular/core';
import { Item } from './app.types';

@Injectable({
  providedIn: 'root'
})

export class ListItemsService {

  constructor() { }

  setItems(items: Item[]) {
    localStorage.setItem(
      'shopping-list-items',
      JSON.stringify(items, null, 2)
    );
  }
  getItems() {
    const items = localStorage.getItem('shopping-list-items');
    if (items) {
      return JSON.parse(items);
    } else {
      return null;
    }
  }

}
