'use server'
import getToken from "./getToken"
import { Root } from "@/types/cart";

export async function addToCart(id: string):Promise<Root>  {

    const acessToken = await getToken();

    if (!acessToken) {
        throw new Error("Authentication token is missing");
    }

    const response = await fetch("https://ecommerce.routemisr.com/api/v2/cart",
        {
            method: "POST",
            headers: {
                token: acessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId: id }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || "Failed to add product to cart");
    }

    return data;
}

export async function getLoggedUserCart(): Promise<Root> {

    const acessToken = await getToken();
    console.log("acessToken", acessToken);
    if (!acessToken) {
        throw new Error("Authentication token is missing");
    }

    const response = await fetch("https://ecommerce.routemisr.com/api/v2/cart",
        {

            headers: {
                token: acessToken,
                "Content-Type": "application/json",
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || "Failed to get Card");
    }

    return data;
}

export async function updateCartProductQty(id: string, qty: number): Promise<Root> {

    const acessToken = await getToken();

    if (!acessToken) {
        throw new Error("Authentication token is missing");
    }

    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${id}`,
        {
            method: "PUT",
            headers: {
                token: acessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "count": qty
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || "Failed to get Card");
    }

    return data;
}

export async function removeCartProduct(id: string): Promise<Root> {
    const acessToken = await getToken();

    if (!acessToken) {
        throw new Error("Authentication token is missing");
    }

    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${id}`, {
        method: "DELETE",
        headers: {
            token: acessToken,
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || "Failed to remove product from cart");
    }

    return data;
}


export async function clearCart(): Promise<Root> {
    const acessToken = await getToken();

    if (!acessToken) {
        throw new Error("Authentication token is missing");
    }

    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
        method: "DELETE",
        headers: {
            token: acessToken,
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || "Failed to clear cart");
    }

    return data;
}
