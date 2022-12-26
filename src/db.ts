import Dexie, { Table } from "dexie";

export interface Note {
  id?: number;
  title: string;
  lastEditDate: string;
  content: string;
}

export class MySubClassedDexie extends Dexie {
  notes!: Table<Note>;

  constructor() {
    super("notesDatabase");
    this.version(1).stores({
      notes: "++id, title, lastEditDate, content",
    });
  }
}

export const db = new MySubClassedDexie();
