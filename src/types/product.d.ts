type ProductParams = {
    page: number
    limit: number
}

type Variant = {
  attributes: Record<string, string>;
  price: number;
  countInStock: number;
  sku: string;
  weight: number;
};


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

 type ListFileImage = {
    url?: string | null
    name?: string
    size?: number
  }


  type ProductCreate = {
     name: string;
     slug: string;
     originalPrice: string;
     category: Categories;
     price: number;
     image: string;
     gallery: string[];
     description: string;
     detaildescription: string;
     hasVariants: boolean, 
     variants: Variants[];
 }


 type CartProduct = {
    _id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    description: string;
 }

