export interface Product {
    id?: string;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    imageBase64?: string | null;
}
