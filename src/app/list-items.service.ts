import { Injectable } from '@angular/core';
import { Item, SavedList } from './app.types';

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
      return [];
    }
  }

  getSavedLists() {
    const savedLists = localStorage.getItem('shopping-list-saved-lists');
    if (savedLists) {
      return JSON.parse(savedLists);
    } else {
      return [];
    }
  }

  setSavedLists(savedLists: SavedList[]) {
    localStorage.setItem(
      'shopping-list-saved-lists',
      JSON.stringify(savedLists, null, 2)
    );
  }

}
