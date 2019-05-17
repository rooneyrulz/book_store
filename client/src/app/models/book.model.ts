import { User } from './user.model';

export interface Book {
  _id?: string;
  name: string;
  author: User;
  description: string;
  date?: Date;
  bookImage: string;
}
