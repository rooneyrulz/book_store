import { User } from './user.model';

export interface Auth {
  token: string;
  user: User;
}
