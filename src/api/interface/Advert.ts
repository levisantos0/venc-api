export interface Advert {
  id?: string;
  title: string;
  description: string;
  price: number;
  location: number;
  address: string;
  email: string;
  telephone: string;
  categoryId: number;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
