import { TItemUid } from './types';

export interface IItem {
  uid: TItemUid;
  title: string;
  description: string;
  price: string;
  email: string;
  image: string;
}

export interface IFavoriteItem {
  id: number;
  uid: TItemUid;
}
