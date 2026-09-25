'use server'

import { getUserId } from "./getToken";

export async function getUserOrders(){

    const id = await getUserId();
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
}
