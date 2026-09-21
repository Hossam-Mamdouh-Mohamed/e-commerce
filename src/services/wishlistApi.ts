'use server'
import { Root, WishListRoot } from "@/types/wishList";
import getToken from "./getToken"

export async function addToWishList(id: string):Promise<Root>  {

    const acessToken = await getToken();

    if (!acessToken) {
        throw new Error("Authentication token is missing");
    }

    const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist",
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
        throw new Error(data?.message || "Failed to add product to wishList");
    }

    return data;
}

export async function getLoggedUserWishList(): Promise<WishListRoot> {

    const acessToken = await getToken();

    if (!acessToken) {
        throw new Error("Authentication token is missing");
    }

    const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist",
        {

            headers: {
                token: acessToken,
                "Content-Type": "application/json",
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || "Failed to get wishlist");
    }

    return data;
}

export async function removeWishListProduct(id: string): Promise<Root> {
    const acessToken = await getToken();

    if (!acessToken) {
        throw new Error("Authentication token is missing");
    }

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        method: "DELETE",
        headers: {
            token: acessToken,
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || "Failed to remove product from wishlist");
    }

    return data;
}