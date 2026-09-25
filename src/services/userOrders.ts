'use server'

import { Root } from "@/types/orders";
import { getUserId } from "./getToken";

export async function getUserOrders():Promise<Root[]>{

    const id = await getUserId();
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
}