import { Brand} from "@/app/types/products";
import { error } from "console";
import { promises } from "dns";

export async function getBrands(): Promise<Brand[]> {

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`);
    if (!response.ok)
        throw new Error('Errror');

    const payload = await response.json();
    return payload.data
}
