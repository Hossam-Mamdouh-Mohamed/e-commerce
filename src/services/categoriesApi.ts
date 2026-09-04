import { Category, Root, Subcategory } from "@/app/types/products";
import { error } from "console";
import { promises } from "dns";

export async function getCategories(): Promise<Category[]> {

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`);
    if (!response.ok)
        throw new Error('Errror');

    const payload = await response.json();
    return payload.data
}

export async function getSubCategories(id: string): Promise<Subcategory[]> {

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
    if (!response.ok)
        throw new Error('Errror');

    const payload = await response.json();
    return payload.data
}

export async function getSpecificCategory(id: string): Promise<Category> {

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
    if (!response.ok)
        throw new Error("Failed to fetch category");
    const payload = await response.json();
    return payload.data
}