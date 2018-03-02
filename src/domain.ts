export type Id = number;
export type Email = string;
export type Name = string;
export type Title = string;

export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: Name;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: Id;
  name: Name;
  username: string;
  email: Email;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Post {
  userId: Id;
  id: Id;
  title: Title;
  body: string;
}

export interface Comment {
  postId: Id;
  id: Id;
  name: Name;
  email: Email;
  body: string;
}

export interface Album {
  userId: Id;
  id: Id;
  title: Title;
}

export interface Photos {
  albumId: Id;
  id: Id;
  title: Title;
  url: string;
  thumbnailUrl: string;
}
