import { Brand} from "@/types/product";
import { error } from "console";
import { promises } from "dns";

export async function getBrands(): Promise<Brand[]> {

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`);
    if (!response.ok)
        throw new Error('Errror');

    const payload = await response.json();
    return payload.data
}
