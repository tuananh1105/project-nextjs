type BlogParams = {
    page: number
    limit: number
}

type Blog = {
    _id: string
    title: string;
    author: string;
    tags: string[];
    thumbnail: string;
    description: string;
}


type CreateBlog = {
    _id: string
    title: string;
    author: string;
    content: string;
    tags: string[];
    gallery: string[];
    thumbnail: string;
    description: string;
}