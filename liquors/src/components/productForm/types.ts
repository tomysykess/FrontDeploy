export interface IProductForm {
    name: string;
    description: string;
    imgUrl: string;
    category: string;
    abv: string;
    brand: string;
    country: string;
    size: string;
  }
  
  export interface IProductFormErrorProps {
    name?: string;
    description?: string;
    imgUrl?: string;
    category?: string;
    abv?: string;
    brand?: string;
    country?: string;
    size?: string;
  }

  export interface IProductUpdatedData {
    name: string;
    description: string;
    imgUrl: string;
    category: string;
    abv: number;
    brand: string;
    country: string;
    size: string;
  }




