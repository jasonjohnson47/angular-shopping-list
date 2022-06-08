export interface Item {
  id: string;
  label: string;
  completed: boolean;
}

export interface ShoppingGroup {
  category: string,
  items: string[]
}

export interface SavedList {
  name: string,
  items: Item[]
}