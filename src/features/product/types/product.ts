export interface IProduct {
    _id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    slug: string;
    tags: string[];
    title: string;

    // TODO: agregar createdAt y updatedAt
    createdAt: string;
    updatedAt: string;

}
