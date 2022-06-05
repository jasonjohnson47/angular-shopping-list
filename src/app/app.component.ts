import { Component, OnInit } from '@angular/core';
import { ListItemsService } from './list-items.service';
import { Item, ShoppingGroup } from './app.types';
import { HttpClient } from '@angular/common/http';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private listItemsService: ListItemsService,
    private httpClient: HttpClient
  ) { }

  allShoppingItems: any = [];

  ngOnInit(){
    this.httpClient.get("assets/all-shopping-items.json").subscribe(data =>{
      console.log(data, Array.isArray(data));
      this.allShoppingItems = data;
    })
  }

  filteredShoppingItems: ShoppingGroup[] = [];
  items = this.listItemsService.getItems();

  autoCompleteSelectAddItem($event: any) {
    this.addItem($event.detail.item.value)
  }

  // do we need this???
  allShoppingItemsFlatArray: string[] = this.allShoppingItems.reduce((acc: string[], curr: ShoppingGroup) => {
    return [...acc, ...curr.items];
  }, []);

  // reorder items after drag/drop
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.listItemsService.setItems(this.items);
  }

  getAutocompleteSuggestions(text: string) {
    if (text) {
      this.filteredShoppingItems = this.allShoppingItems.reduce((acc: ShoppingGroup[], curr: any) => {
        const filteredShoppingGroupItems = curr.items.filter((item: any) => item.includes(text));
        const newShoppingGroup = {...curr, items: filteredShoppingGroupItems }
        if (newShoppingGroup.items.length) {
          return [...acc, newShoppingGroup];
        }
        return acc;
      }, []);
    }
  }

  get nextId() {
    if (this.items.length == 0) {
      return '0';
    }
    const itemIds: number[] = this.items.map((item: Item) => Number(item.id));
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
