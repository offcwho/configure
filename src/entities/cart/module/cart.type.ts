import { ProductType } from "@/entities/products";

export interface Cart {
    id: number;
    product: ProductType;
}