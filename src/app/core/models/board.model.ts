import { Item } from './item.model';

const enum Categories {
  TASK = 1,
  LIST = 2,
}

export class Board {
  id: number;
  name: string;
  category: Categories;
  items: Array<Item>;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.category = data.category;

    this.items = data.items ? Array.from(data.items, (i: Item) => new Item(i)) : [];
  }
}
