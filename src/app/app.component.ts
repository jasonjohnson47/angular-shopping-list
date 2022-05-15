import { Component } from '@angular/core';
import { ListItemsService } from './list-items.service';
import { Item, ShoppingGroup } from './app.types';
import { allShoppingItems } from 'src/all-shopping-items';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor( private listItemsService: ListItemsService ) { }

  allShoppingItems = allShoppingItems;
  filteredShoppingItems: ShoppingGroup[] = [];
  items = this.listItemsService.getItems();

  autoCompleteSelectAddItem($event: any) {
    this.addItem($event.detail.item.value)
  }

  // do we need this???
  allShoppingItemsFlatArray: string[] = this.allShoppingItems.reduce((acc: string[], curr: ShoppingGroup) => {
    return [...acc, ...curr.items];
  }, []);

  getAutocompleteSuggestions(text: string) {
    if (text) {
      this.filteredShoppingItems = allShoppingItems.reduce((acc: ShoppingGroup[], curr) => {
        const filteredShoppingGroupItems = curr.items.filter((item) => item.includes(text));
        const newShoppingGroup = {...curr, items: filteredShoppingGroupItems }
        if (newShoppingGroup.items.length) {
          return [...acc, newShoppingGroup];
        }
        return acc;
      }, []);
    }
  }

  get nextId() {
    if (this.items == null) {
      return '0';
    }
    const itemIds = this.items.map((item: Item) => Number(item.id));
    const highestId = Math.max(...itemIds);
    const nextId = String(highestId + 1);
    return nextId;
  }

  addItem(value: string) {
    const newItem = { id: this.nextId, label: value, completed: false };
    if (this.items == null) {
      this.items = [newItem];
    } else {
      this.items.push(newItem);
    }
    this.listItemsService.setItems(this.items);
  }

  removeItem(id: string) {
    const newItems = this.items.filter((item: Item) => item.id != id);
    this.items = newItems;
    this.listItemsService.setItems(newItems);
  }

  onCheckboxChange(id: string, value: boolean) {
    const updatedItems = this.items.map((item: Item) => {
      if (item.id == id) {
        item.completed = value;
      }
      return item;
    });
    this.listItemsService.setItems(updatedItems);
  }

}
