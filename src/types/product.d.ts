type ProductParams = {
    page: number
    limit: number
}

type Variants ={
    _id: string
    size: string;
    color: string;
    countInStock: number;
    imageVariant: string;
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

type ProductAdmin = {
    _id: string
    slug: string
    key: React.Key;
    name: string;
    category: string;
    price: number;
    image: string;
    description: string;
 }

