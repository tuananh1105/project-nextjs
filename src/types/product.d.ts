type ProductParams = {
    page: number
    limit: number
}

type Categories = {
    name: string;
    slug: string;
    status: string;
}

type Variants ={
    size: string;
    color: string;
    countInStock: number;
    price: number;
    weight: number;
    sku: string;
}

type Product = {
   _id: string;
    name: string;
    slug: string;
    category: Categories;
    price: number;
    image: string;
    gallery: string[];
    description: string;
    detaildescription: string;
    variants: Variants[];
}

type MetaData = {
    totalItems: number
    totalPages: number
    currentPage: number
  }

