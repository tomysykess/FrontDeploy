export interface Login {
  name: string;
  email: string;
  password: string;
}

export interface Register {
  name: string;
  email: string;
  password: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  category: string;
  abv: number;
  brand: string;
  country: string;
  size: string;
  userId: string;
}

export interface ProductsState {
  data: Product[];
  ginProducts: Product[];
  wineProducts: Product[];
  dataFiltered: Product[];
  page: number[];
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: number;
  firebaseUid: string;
}
export interface IReview {
  id: string;
  rate: number;
  comment: string;
  userId: IUser;
}

export interface ITeamMember {
  id: number;
  name: string;
  role: string;
  img: string;
  GitHub: string;
  LinkedIn: string;
}

export interface IRecommendation {
  title: string;
  imageB: string;
  imageF: string;
  imageP: string;
  description: string;
  color: string;
  link: string;
}

export interface ProductFiltered {
  item: string;
}

export interface ISuscribe {
  title: string;
  description1: string;
  description2: string;
  description3: string;
  description4: string;
  price: number;
  type: string;
  role: number;
}

export interface IPremium {
  type: string;
  status: string;
  amount: number;
}

export interface INews {
  imageB: string;
  imageF: string;
  title: string;
  text: string;
  direction: "left" | "right";
}
