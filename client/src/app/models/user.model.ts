import { Book } from './book.model';

export interface User {
  _id?: string;
  name: string;
  age: number;
  email: string;
  password: string;
  books: Book[];
  date?: Date;
}
